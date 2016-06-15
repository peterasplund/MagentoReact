<?php

header('Access-Control-Allow-Origin: http://192.168.10.212');
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: POST, GET');

class Crossroads_API_ProductController extends Crossroads_API_Controller_Super
{

  public function getAction()
  {
    $id = $this->getRequest()->getParam('id');
    try {
      $product = Mage::getModel('catalog/product')->load($id);
      $product->image = $product->getImageUrl();
    } catch (Exception $e) {
      $this->_outputJson($this->_prepare_message_array(false, 'Product is missing.', null), true);
      die();  
    }

    // @todo: prepare product data and filter unnecessary stuff.
    echo $this->_outputJson($product->getData());

  }

}
