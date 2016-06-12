<?php

header('Access-Control-Allow-Origin: http://192.168.10.212');
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: POST, GET');

class Crossroads_API_CartController extends Crossroads_API_Controller_Super
{
	protected function _get_cart() {
		return Mage::getSingleton('checkout/cart');
	}

	protected function _get_session() {
		return Mage::getSingleton('checkout/session');
	}

	protected function _load_product($productId) {
		if ($productId) {
			$product = Mage::getModel('catalog/product')
			->setStoreId(Mage::app()->getStore()->getId())
			->load($productId);
			if ($product->getId()) {
				return $product;
			}
		}
		return false;
	}

    public function addAction() {
    	try {
    		$cart   = $this->_get_cart();
    		$params = $this->getRequest()->getParams();

    		if (isset($params['qty'])) {
    			$filter = new Zend_Filter_LocalizedToNormalized(
    				array('locale' => Mage::app()->getLocale()->getLocaleCode())
    				);
    			$params['qty'] = $filter->filter($params['qty']);
    		}

        $productId = (int) $this->getRequest()->getParam('product');

    		$product = $this->_load_product($productId);

    		$related = $this->getRequest()->getParam('related_product');

    		if (!$product) {
    			$this->_outputJson($this->_prepare_message_array(false, 'Product is missing.', null), true);
    			return false;
    		}

        $cart->addProduct($product, $params);
        if (!empty($related)) {
          $cart->addProductsByIds(explode(',', $related));
        }


    		$cart->save();
    		$this->_get_session()->setCartWasUpdated(true);
    	} catch (Exception $e) {
    		$this->_outputJson($this->_prepare_message_array(false, $e->getMessage(), null), true);
    		return false;
    	}

    	Mage::dispatchEvent('checkout_cart_add_product_complete',
    		array('product' => $product, 'request' => $this->getRequest(), 'response' => $this->getResponse())
		);

        $cartData = Mage::helper('API')->getCartItems();

        $quote = Mage::getSingleton('adminhtml/session_quote');

    	$this->_outputJson($this->_prepare_message_array(True, 'Product successfully added.', $cartData));
    	return true;
    }

    public function deleteAction() {

        $id = $this->getRequest()->getParam('id');

        if (empty($id)) {
            $this->_outputJson($this->_prepare_message_array(False, 'No item id.', array()), true);
            return;
        }

        $cart = $this->_get_cart()->removeItem($id);
        $cart->save();


        $cartData = Mage::helper('API')->getCartItems();

        $this->_outputJson($this->_prepare_message_array(True, 'Product successfully removed.', $cartData));
    }

    public function getAction() {
      $cartData = Mage::helper('API')->getCartItems();

      $this->_outputJson($this->_prepare_message_array(True, 'Cart successfully loaded.', $cartData));
    }
}
