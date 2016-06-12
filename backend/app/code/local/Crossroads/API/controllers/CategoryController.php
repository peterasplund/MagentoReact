<?php

header('Access-Control-Allow-Origin: http://192.168.10.212');
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: POST, GET');

class Crossroads_API_CategoryController extends Crossroads_API_Controller_Super
{
	private $_productHelper;

	public function _construct()
  {
    $this->_productHelper = Mage::helper('API/Product');
  }

	public function getCategoriesAction() {
		$storeid = Mage::app()->getStore()->getStoreId();
		$rootid = Mage::app()->getStore($storeid)->getRootCategoryId();
    $categories = Mage::getModel('catalog/category')
        ->getCollection()
        ->setStoreId($storeid)
        ->addFieldToFilter('is_active', 1)
        ->addAttributeToFilter('path', array('like' => "1/{$rootid}/%"))
        ->addAttributeToSelect('*');

    $processedCategories = array();

    foreach ($categories as $category) {
      $processedCategories[] = $category->getData();
    }

		echo $this->_outputJson($processedCategories);
	}

	public function getProductsAction()
	{
    $slug = $this->getRequest()->getParam('s');

		$data = $this->_productHelper->getCategory($slug);
		echo $this->_outputJson($data);
	}

}
