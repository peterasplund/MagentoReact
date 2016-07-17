<?php

/**
* Helper for fetching properties by product configurational item
*
* @category   Mage
* @package    Mage_Bundle
* @author     Magento Core Team <core@magentocommerce.com>
*/
class Crossroads_BundleItems_Helper_Catalog_Product_Configuration extends Mage_Bundle_Helper_Catalog_Product_Configuration
{

  /**
  * Get bundled selections (slections-products collection)
  *
  * Returns array of options objects.
  * Each option object will contain array of selections objects
  *
  * @return array
  */
  public function getBundleOptions(Mage_Catalog_Model_Product_Configuration_Item_Interface $item)
  {
    $options = array();
    $product = $item->getProduct();

    /**
    * @var Mage_Bundle_Model_Product_Type
    */
    $typeInstance = $product->getTypeInstance(true);

    // get bundle options
    $optionsQuoteItemOption = $item->getOptionByCode('bundle_option_ids');
    $bundleOptionsIds = $optionsQuoteItemOption ? unserialize($optionsQuoteItemOption->getValue()) : array();
    if ($bundleOptionsIds) {

      /**
      * @var Mage_Bundle_Model_Mysql4_Option_Collection
      */
      $optionsCollection = $typeInstance->getOptionsByIds($bundleOptionsIds, $product);

      // get and add bundle selections collection
      $selectionsQuoteItemOption = $item->getOptionByCode('bundle_selection_ids');

      $selectionsCollection = $typeInstance->getSelectionsByIds(
        unserialize($selectionsQuoteItemOption->getValue()),
        $product
      );

      $bundleOptions = $optionsCollection->appendSelections($selectionsCollection, true);
      foreach ($bundleOptions as $bundleOption) {
        if ($bundleOption->getSelections()) {
          $option = array(
            'label' => $bundleOption->getTitle(),
            'value' => array()
          );

          $bundleSelections = $bundleOption->getSelections();

          foreach ($bundleSelections as $bundleSelection) {
            $qty = $this->getSelectionQty($product, $bundleSelection->getSelectionId()) * 1;
            if ($qty) {

              if ($product->getAttributeSetId() == 80) {
                // hide label for products with attribute = "kampanj"
                $_value = $this->escapeHtml($bundleSelection->getName());
                unset($option['label']);
              }
              else
              {
                // don't show price for each option
                $_value = $qty . ' x ' . $this->escapeHtml($bundleSelection->getName());
              }

              $option['value'][] = $_value;

            }
          }

          if ($option['value']) {
            $options[] = $option;
          }
        }
      }
    }

    return $options;
  }
}
