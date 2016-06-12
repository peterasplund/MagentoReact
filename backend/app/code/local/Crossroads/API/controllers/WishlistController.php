<?php

header('Access-Control-Allow-Origin: http://192.168.10.212');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET');

class Crossroads_API_WishlistController extends Crossroads_API_Controller_Super
{
	private $_helper;

	public function _construct() {
		$this->_helper = Mage::helper('API/wishlist');
	}

    /**
     *
     * Prepare Return Json Message Structure
     * @param boolean $_success, whether the action is success
     * @param string $_message, message
     * @param array $_data, attached data
     */
	private function _prepare_message_array($_success, $_message, $_data) {
		return array(
			'success' => $_success,
			'message' => $this->__($_message),
			'data' => $_data,
		);
	}

    public function addItemToCartAction() {

        $itemId = (int) $this->getRequest()->getParam('item');
        $wishlist = $this->_helper->getWishlist();
        $item = Mage::getModel('wishlist/item')->load($itemId);
        $session    = Mage::getSingleton('wishlist/session');
        $cart       = Mage::getSingleton('checkout/cart');

        try {
            $options = Mage::getModel('wishlist/item_option')->getCollection()
                    ->addItemFilter(array($itemId));
            $item->setOptions($options->getOptionsByItem($itemId));

            $item->setQty(1);

            $item->addToCart($cart);
            $cart->save()->getQuote()->collectTotals();

            $cartItems = Mage::helper('API')->getCartItems();
            $items = $this->_helper->prepareWishlist($wishlist);

            $message = $this->__('Product successfully added.');
            $this->getResponse()->setBody(
                json_encode($this->_prepare_message_array(true, $message, array( "cart" => $cartItems, "wishlist" => $items)))
            );
            return false;

        } catch (Mage_Core_Exception $e) {
            if ($e->getCode() == Mage_Wishlist_Model_Item::EXCEPTION_CODE_NOT_SALABLE) {
                $message = Mage::helper('wishlist')->__('This product(s) is currently out of stock');
                $this->getResponse()->setBody(
                    json_encode($this->_prepare_message_array(false, $message, null))
                );
                return false;
            } elseif ($e->getCode() == Mage_Wishlist_Model_Item::EXCEPTION_CODE_NOT_SPECIFIED_PRODUCT) {
                if (!$wishlist->getItemsCount()) {
                    $session = Mage::getSingleton('catalog/session');
                }
                //Cannot add the selected product to shopping cart because the product was removed from the wishlist
                $message = Mage::helper('wishlist')->__('Product is missing.');
                $this->getResponse()->setBody(
                    json_encode($this->_prepare_message_array(false, $message, null))
                );
                return false;
            } else {
                $message = Mage::helper('wishlist')->__($e->getMessage());
                $this->getResponse()->setBody(
                    json_encode($this->_prepare_message_array(false, $message, null))
                );
                return false;

            }
        } catch (Exception $e) {
            //Cannot add item to shopping cart
            $message = Mage::helper('wishlist')->__('Product is missing.');
            $this->getResponse()->setBody(
                json_encode($this->_prepare_message_array(false, $message, null))
            );
            return false;
        }
    }

    public function deleteAction() {

        $session = Mage::getSingleton('customer/session');
        $wishlist = $this->_helper->getWishlist();

        $customerId = $session->getCustomer()->getId();

        $itemId = (int) $this->getRequest()->getParam('id');

        if(!$session->isLoggedIn()) {
            $message = $this->__('Please Login First');
            $this->getResponse()->setBody(
                json_encode($this->_prepare_message_array(false, $message, null))
            );
            return false;
        }

        if (!$wishlist) {
            $message = $this->__('Unable to Create Wishlist');
            $this->getResponse()->setBody(
                json_encode($this->_prepare_message_array(false, $message, null))
            );
            return false;
        }

        try {

            $itemCollection = Mage::getModel('wishlist/item')->getCollection()
                ->addCustomerIdFilter($customerId);

            $success = false;

            foreach($itemCollection as $item) {
                if ($item->getId() == $itemId) {

                    $item->delete();
                    $success = true;
                }
            }

            Mage::helper('wishlist')->calculate();

            if ($success) {

                $message = $this->__('%1$s has been removed from your wishlist.', $item->getProduct()->getName());
            } else {
                $message = $this->__('Something went wrong.');
            }

            $items = $this->_helper->prepareWishlist($wishlist);

            $this->getResponse()->setBody(
                json_encode($this->_prepare_message_array($success, $message, $items))
            );

            Mage::unregister('wishlist');
            return true;
        }
        catch (Mage_Core_Exception $e) {

            Mage::logException($e->getMessage());
            $message = $this->__('An error occurred while adding item to wishlist: %s');
            $this->getResponse()->setBody(
                json_encode($this->_prepare_message_array(false, $message, null))
            );
            return false;

        }
        catch (Exception $e) {
            Mage::logException($e->getMessage());
            $message = $this->__('An error occurred while adding item to wishlist.');
            $this->getResponse()->setBody(
                json_encode($this->_prepare_message_array(false, $message, null))
            );
            return false;
        }

        $message = $this->__('Something went wrong. Please try again later.');
        $this->getResponse()->setBody(
            json_encode($this->_prepare_message_array(false, $message, null))
        );
        return false;
    }

    public function addAction() {

    	$session = Mage::getSingleton('customer/session');
    	$wishlist = $this->_helper->getWishlist();


    	$productId = (int) $this->getRequest()->getParam('product');

        if(!$session->isLoggedIn()) {
    		$message = $this->__('Please Login First');
			$this->getResponse()->setBody(
				json_encode($this->_prepare_message_array(false, $message, null))
            );
            return false;
        }

        if (!$wishlist) {
            $message = $this->__('Unable to Create Wishlist');
			$this->getResponse()->setBody(
				json_encode($this->_prepare_message_array(false, $message, null))
            );
            return false;
        }

        if (!$productId) {
            $message = $this->__('Product Not Found');
			$this->getResponse()->setBody(
				json_encode($this->_prepare_message_array(false, $message, null))
            );
            return false;
        }

        $product = Mage::getModel('catalog/product')->load($productId);

        if (!$product->getId() || !$product->isVisibleInCatalog()) {
            $message = $this->__('Cannot specify product.');
			$this->getResponse()->setBody(
				json_encode($this->_prepare_message_array(false, $message, null))
            );
            return false;
        }

        try {
            $requestParams = $this->getRequest()->getParams();
            $buyRequest = new Varien_Object($requestParams);

            $result = $wishlist->addNewItem($product, $buyRequest);

            if (is_string($result)) {
                Mage::throwException($result);
            }

            $wishlist->save();

            $requestData = array(
                'wishlist'  => $wishlist,
                'product'   => $product,
                'item'      => $result
            );

            Mage::dispatchEvent(
                'wishlist_add_product',
                $requestData
            );

            Mage::helper('wishlist')->calculate();

            $message = $this->__('%1$s has been added to your wishlist.', $product->getName());

            $items = $this->_helper->prepareWishlist($wishlist);

			$this->getResponse()->setBody(
				json_encode($this->_prepare_message_array(true, $message, $items))
            );

            Mage::unregister('wishlist');
            return true;
        }
        catch (Mage_Core_Exception $e) {

    		Mage::logException($e->getMessage());
    		$message = $this->__('An error occurred while adding item to wishlist: %s');
			$this->getResponse()->setBody(
				json_encode($this->_prepare_message_array(false, $message, null))
            );
            return false;

        }
        catch (Exception $e) {
        	Mage::logException($e->getMessage());
        	$message = $this->__('An error occurred while adding item to wishlist.');
			$this->getResponse()->setBody(
				json_encode($this->_prepare_message_array(false, $message, null))
            );
            return false;
        }

		$message = $this->__('Something went wrong. Please try again later.');
		$this->getResponse()->setBody(
			json_encode($this->_prepare_message_array(false, $message, null))
        );
    	return false;
	}

}
