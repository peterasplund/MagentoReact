<?php

class Crossroads_API_Helper_Product extends Mage_Core_Helper_Abstract
{
	private function _slugify($url) {

		$newUrl = "";

		$newUrl = str_replace("--", "|", $url);
		$newUrl = str_replace("__", "&", $newUrl);
		$newUrl = str_replace("%20", " ", $newUrl);
		$newUrl = str_replace("-", " ", $newUrl);
		$newUrl = str_replace("|", "-", $newUrl);

		return $newUrl;
	}

	private function _prepareCollection($collections) {
		$newCollection = array();

		if (gettype($collections) !== 'array') {
			$collections = array($collections);
		}

		foreach ($collections as $i => $collection) {
			if ($i === 0) {
				$lastPageNumber = $collection->getLastPageNumber();
			}
			foreach ($collection as $product) {

				if ($product->getData('is_salable') === "0") {
					continue;
				}

				foreach ($newCollection as $p) {
					if ($p["id"] === $product->getId()) {
						continue 2;
					}
				}

				$data = $product->getData();
				$thumbnail = Mage::helper('catalog/image')->init($product, 'small_image')->resize(285);

        $data["id"] = $product->getId();

        // finalPrice is too slow. Maybe we need to index it.
				// $data["finalPrice"] = $product->getFinalPrice();
				$data["thumbnail"] = (string)$thumbnail;

				$newCollection[] = $data;
			}
		}

		return $newCollection;
	}

	public function getCategory($categorySlug, $loadOutOfStock = true)
	{
 		$category = Mage::getModel('catalog/category')->loadByAttribute('url_key', $categorySlug);
 		$collection = Mage::getResourceModel('catalog/product_collection');
 		$collection->addAttributeToSelect('*');

		$collection
      ->addAttributeToFilter('visibility', array('neq' => Mage_Catalog_Model_Product_Visibility::VISIBILITY_NOT_VISIBLE))
      ->addCategoryFilter($category);

      if (!$loadOutOfStock) {
        $collection->joinField('is_in_stock',
          'cataloginventory/stock_item',
          'is_in_stock',
          'product_id=entity_id',
          'is_in_stock=1',
          '{{table}}.stock_id=1',
          'left')
        ->addAttributeToFilter('is_in_stock', "1");
      }


			$collection->load();

		return $this->_prepareCollection($collection);
	}

	public function getProductsByAttributeValue($attributeCode, $optionId, $loadOutOfStock = true)
	{
		$collection = Mage::getResourceModel('catalog/product_collection');
 		$collection->addAttributeToSelect('*');
		$collection
      ->addAttributeToFilter('visibility', array('neq' => Mage_Catalog_Model_Product_Visibility::VISIBILITY_NOT_VISIBLE))
      ->addAttributeToFilter($attributeCode, $optionId);

      if (!$loadOutOfStock) {
        $collection->joinField('is_in_stock',
          'cataloginventory/stock_item',
          'is_in_stock',
          'product_id=entity_id',
          'is_in_stock=1',
          '{{table}}.stock_id=1',
          'left')
        ->addAttributeToFilter('is_in_stock', "1");
      }


			$collection->load();

		return $this->_prepareCollection($collection);
	}

}
