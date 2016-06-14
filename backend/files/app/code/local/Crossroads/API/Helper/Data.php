<?php

class Crossroads_API_Helper_Data extends Mage_Payment_Helper_Data
{

  public function getCartItems() {
    $quote = Mage::getModel('checkout/cart')->getQuote();
    $cartItems = $quote->getAllItems();

    $grandTotal = 0;

    foreach ($cartItems as $item) {
      $product = $item->getProduct();

      $cartData["items"][] = array(
        "id" =>         $item->getId(),
        "productId" =>  $product->getId(),
        "name" =>       $product->getName(),
        "qty" =>        $product->getQty(),
        "price" =>      $item->getPriceInclTax(),
        "option" =>     $product->getTypeInstance(true)->getOrderOptions($product)
      );

      $grandTotal += $item->getPriceInclTax() * $item->getQty();
    }

    $cartData["summary"]["grand_total"] = $grandTotal;

    return $cartData;
  }
}
