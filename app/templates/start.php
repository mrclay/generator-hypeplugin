<?php

/**
 * <%= userOpts.pluginName %>
 *
 * <%= userOpts.pluginDescription %>
 * 
 * @author <%= userOpts.pluginAuthor %> <<%= userOpts.pluginAuthorEmail %>>
 * @copyright Copyright (c) <%= systemOpts.year%>, <%= userOpts.pluginAuthor %>
 */
require_once __DIR__ . '/autoloader.php';

elgg_register_event_handler('init', 'system', '<%= userOpts.pluginId %>_init');

/**
 * Initialize
 * @return void
 */
function <%= userOpts.pluginId %>_init() {

}
