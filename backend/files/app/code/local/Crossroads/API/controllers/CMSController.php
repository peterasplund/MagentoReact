<?php

header('Access-Control-Allow-Origin: http://192.168.10.212');
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: POST, GET');

class Crossroads_API_CMSController extends Crossroads_API_Controller_Super
{
  public function getPageAction()
  {
    $identifier = $this->getRequest()->getParam('s');

    $data = Mage::getModel('cms/page')->setStore(Mage::app()->getStore()->getId())->load($identifier, 'identifier');

    $helper = Mage::helper('cms');
    $processor = $helper->getPageTemplateProcessor();
    $html = $processor->filter($data->content);
    $data = $data->getData();
    $data["content"] = $html;
    echo $this->_outputJson($data);
  }

  public function getBlockAction()
  {
    $identifier = $this->getRequest()->getParam('s');

    $data = Mage::getModel('cms/block')->setStore(Mage::app()->getStore()->getId())->load($identifier);

    $helper = Mage::helper('cms');
    $processor = $helper->getPageTemplateProcessor();
    $html = $processor->filter($data->content);
    $data = $data->getData();
    $data["content"] = $html;
    echo $this->_outputJson($data);
  }

}
