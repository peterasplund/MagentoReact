<?php

header('Access-Control-Allow-Origin: http://192.168.10.212');
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: POST, GET');

class Crossroads_API_ProductController extends Crossroads_API_Controller_Super
{

  public function _construct() {
    define('THUMBNAIL_SIZE', 70);
    define('THUMBNAIL_SIZE2x', 140);
    define('IMAGE_SIZE', 600);
    define('IMAGE_SIZE2x', 1200);

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
  // Should also return an array of images which should be loaded as a srcset in Components/Media.
  private function prepareMediaGallery($product) {
    $gallery = array();
    $rawGallery = $product->getMediaGalleryImages();

    foreach ($rawGallery as $image) {
      $gallery[] = array(
        "thumbnail" => array( (string)$this->imageHelper->init($product, 'image', $image->getFile())->resize(THUMBNAIL_SIZE), (string)$this->imageHelper->init($product, 'image', $image->getFile())->resize(THUMBNAIL_SIZE2x) ),
        "image"     => array( (string)$this->imageHelper->init($product, 'image', $image->getFile())->resize(IMAGE_SIZE), (string)$this->imageHelper->init($product, 'image', $image->getFile())->resize(IMAGE_SIZE2x) )
      );
    }

    return $gallery;
  }

  public function getAction()
  {
    $id = $this->getRequest()->getParam('id');
    try {
      $product = Mage::getModel('catalog/product')->load($id);
      $product->image = array( (string)$this->imageHelper->init($product, 'image')->resize(IMAGE_SIZE), (string)$this->imageHelper->init($product, 'image')->resize(IMAGE_SIZE2x) );
      $product->options = $this->prepareOptions($product);
      $product->media_gallery = $this->prepareMediaGallery($product);
      $manufacturerKey = array( 'name', 'id' );
      $manufacturerValue = array( $product->getAttributeText('manufacturer'), $product->manufacturer );
      $product->manufacturer = array_combine( $manufacturerKey, $manufacturerValue ); // Make manufacturer return text instead of id

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
