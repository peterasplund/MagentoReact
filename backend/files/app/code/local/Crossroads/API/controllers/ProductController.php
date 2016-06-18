<?php

header('Access-Control-Allow-Origin: http://192.168.10.212');
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: POST, GET');

class Crossroads_API_ProductController extends Crossroads_API_Controller_Super
{

  public function _construct() {
    define('THUMBNAIL_SIZE', 70);
    define('IMAGE_SIZE', 600);

    $this->imageHelper = Mage::helper('catalog/image');
  }

  private function prepareOptions($product) {
    $rawOptions = $product->getOptions();
    $options = array();

    foreach ($rawOptions as $option) {
      $rawValues = $option->getValues();
      $values = array();
      foreach ($rawValues as $value) {
        $values[] = $value->getData();
      }
      $options[] = array(
        "title"   => $option->getTitle(),
        "type"    => $option->getType(),
        "require" => $option->getIsRequire(),
        "values"  => $values
      );
    }
    return $options;
  }

  // @todo: maybe check if image is disabled and stuff. Hopefully Magento takes care of this though.
  private function prepareMediaGallery($product) {
    $gallery = array();
    $rawGallery = $product->getMediaGalleryImages();

    foreach ($rawGallery as $image) {
      $gallery[] = array(
        "thumbnail" => (string)$this->imageHelper->init($product, 'image', $image->getFile())->resize(THUMBNAIL_SIZE),
        "image"     => (string)$this->imageHelper->init($product, 'image', $image->getFile())->resize(IMAGE_SIZE)
      );
    }

    return $gallery;
  }

  public function getAction()
  {
    $id = $this->getRequest()->getParam('id');
    try {
      $product = Mage::getModel('catalog/product')->load($id);
      $product->image = (string)$this->imageHelper->init($product, 'image')->resize(IMAGE_SIZE);
      $product->options = $this->prepareOptions($product);
      $product->media_gallery = $this->prepareMediaGallery($product);

      // finalPrice is too slow. Maybe we need to index it.
      // $product->finalPrice = $product->getFinalPrice();
  
    } catch (Exception $e) {
      $this->_outputJson($this->_prepare_message_array(false, 'Product is missing.', null), true);
      die();  
    }

    // @todo: prepare product data and filter unnecessary stuff.
    echo $this->_outputJson($product->getData());

  }

}
