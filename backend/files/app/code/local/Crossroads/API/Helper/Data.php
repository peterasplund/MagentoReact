<?php

class Crossroads_API_Helper_Data extends Mage_Payment_Helper_Data
{

  public function getCartItems() {
    $quote = Mage::getModel('checkout/cart')->getQuote();
    $cartItems = $quote->getAllItems();
    $cartData = array("items" => array());

    $grandTotal = 0;
    $qty = 0;

    foreach ($cartItems as $item) {
      $product = $item->getProduct();

      $cartData["items"][] = array(
        "id" =>         $item->getId(),
        "productId" =>  $product->getId(),
        "name" =>       $product->getName(),
        "qty" =>        $item->getQty(),
        "price" =>      $item->getPriceInclTax(),
        "option" =>     $product->getTypeInstance(true)->getOrderOptions($product)
      );

      $qty += $item->getQty();
      $grandTotal += $item->getPriceInclTax() * $item->getQty();
    }

    $cartData["summary"]["grand_total"] = $grandTotal;
    $cartData["summary"]["qty"] = $qty;

    return $cartData;
  }
}
