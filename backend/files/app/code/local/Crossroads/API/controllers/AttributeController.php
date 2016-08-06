<?php

header('Access-Control-Allow-Origin: http://192.168.10.212');
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: POST, GET');

class Crossroads_API_AttributeController extends Crossroads_API_Controller_Super
{

	private $_productHelper;

	public function _construct()
  {
    $this->_productHelper = Mage::helper('API/Product');
  }

	public function getAttributeAction($attributeCode) {
		$requestedAttribute = ($attributeCode) ? $attributeCode : $this->getRequest()->getParam('attribute');
		$attribute = Mage::getModel('eav/config')->getAttribute('catalog_product',$requestedAttribute);
    $attributeOptions = $attribute->getSource()->getAllOptions(true, true);
		$processedOptions = array();
		foreach ($attributeOptions as $attributeOption) {
			if (!$attributeOption[label] == '') {
					$processedOptions[] = $attributeOption;
			}
		}
		echo $this->_outputJson($processedOptions);
	}

	public function getProductsAction()
	{
		$attribute = $this->getRequest()->getParam('attribute');
		$value = $this->getRequest()->getParam('value');
		$attributeData = Mage::getModel('catalog/product')->setStoreId($store_id)->setData($attribute, $value)->getAttributeText($attribute);
		$attributeArray = array('attribute' => $attribute, 'attributeValue' => $attributeData);
		$collectionData = array('products' => $this->_productHelper->getProductsByAttributeValue($attribute, $value));
		$finalData = array_merge($attributeArray, $collectionData);
		echo $this->_outputJson($finalData);
	}
}
