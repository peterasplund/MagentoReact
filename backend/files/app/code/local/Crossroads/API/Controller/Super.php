<?php

class Crossroads_API_Controller_Super extends Mage_Core_Controller_Front_Action
{
  /**
     * For outputting a JSON response
     *
     * @param object $data, the response data
     * @param boolean $error, if it should error
  */
  protected function _outputJson($data, $error = false) {
    $this->getResponse()
            ->clearHeaders()
            ->setHeader('Content-Type', 'application/json')
            ->setBody(json_encode($data));

    if ($error) {
      header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
      die();
    }
  }

  /**
     * Prepare Return Json Message Structure
     *
     * @param boolean $_success, whether the action is success
     * @param string $_message, message
     * @param array $_data, attached data
  */
  protected function _prepare_message_array($_success, $_message, $_data) {
    return array(
      'success' => $_success,
      'message' => $this->__($_message),
      'data' => $_data,
    );
  }

}
