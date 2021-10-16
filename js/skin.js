/* global jQuery:false */
/* global A_MART_STORAGE:false */

(function() {
	"use strict";
	// Init skin-specific actions on first run
	// Attention! Don't forget to add the class "inited" and check it to prevent re-initialize the elements
	function a_mart_skin_update_quantity_value() {
		if ( jQuery('.content').find(".product").length > 0 ) {
			// Add depends on quantity
			jQuery(".woocommerce .products").on("click", ".quantity input", function() {
				return false;
			});
			jQuery(".woocommerce .products").on("change input", ".quantity .qty", function() {
				var add_to_cart_button = jQuery(this).parents( ".product" ).find(".add_to_cart_button");
				// For AJAX add-to-cart actions
				add_to_cart_button.data("quantity", jQuery(this).val());
				// For non-AJAX add-to-cart actions
				add_to_cart_button.attr("data-quantity", jQuery(this).val());
			});
			// Trigger on Enter press
			jQuery(".woocommerce .products").on("keypress", ".quantity .qty", function(e) {
				if ((e.which||e.keyCode) === 13) {
					jQuery( this ).parents(".product").find(".add_to_cart_button").trigger("click");
				}
			});
		}
	}

	function a_mart_skin_add_product_custom_height() {
		// Add margin depends on height
		if ( jQuery('.content').find(".product").length > 0 ) {
			jQuery( ".product .post_item" ).hover(function() {
				var add_imagin_margin = jQuery(this).find(".imagin_content_wrap");
				var height = jQuery(this).find( ".inner_product_wrap" ).innerHeight();
				jQuery( add_imagin_margin ).css( {"margin-bottom": - + height });
			});
		}
	}

	function a_mart_skin_add_product_blogger_custom_height() {
		// Add margin depends on height
		if ( jQuery('.content').find(".sc_blogger_product").length > 0 ) {
			jQuery( ".sc_blogger_product .sc_blogger_item" ).hover(function() {
				var add_imagin_margin = jQuery(this).find(".imagin_content_wrap");
				var height = jQuery(this).find( ".sc_blogger_item_footer" ).innerHeight();
				jQuery( add_imagin_margin ).css( {"margin-bottom": - + height });
			});
		}
	}

	jQuery( document ).on(
		'action.ready_a_mart', function() {

			// Process Tribe Events view after it was reloaded by AJAX
			jQuery('.tribe-events-view').on( 'beforeAjaxComplete.tribeEvents beforeAjaxSuccess.tribeEvents beforeAjaxError.tribeEvents', a_mart_tribe_events_after_ajax );
			function a_mart_tribe_events_after_ajax( jqXHR, textStatus ) {
				setTimeout( function() {
					// Set up event handler again because .tribe-events-view was recreated after AJAX
					jQuery('.tribe-events-view').on( 'beforeAjaxComplete.tribeEvents beforeAjaxSuccess.tribeEvents beforeAjaxError.tribeEvents', a_mart_tribe_events_after_ajax );
					// ToDo: Any actions after the Tribe Events View is reloaded

				}, 10 );
			}

			// Init quantity value
			a_mart_skin_update_quantity_value();

			// Add margin depends on height
			a_mart_skin_add_product_custom_height();
			a_mart_skin_add_product_blogger_custom_height();

			// Add padding depends on width ( Sc title inline )
			jQuery(".sc_title.sc_title_inline").each(function() {
				if ( jQuery(this).find(".sc_item_button").length > 0 ) {
					var width = jQuery(this).find( ".sc_item_button" ).innerWidth();
					jQuery( this ).css( {"padding-right": + width + 20 });
				}
			})
		}
	);

	// Init skin-specific hidden elements when their parent container becomes visible
	// Attention! Don't forget to add the class "inited" and check it to prevent re-initialize the elements
	jQuery( document ).on(
		'action.init_hidden_elements', function() {
		}
	);

	// Skin-specific scroll actions
	jQuery( document ).on(
		'action.scroll_a_mart', function() {
			// Add margin depends on height
			a_mart_skin_add_product_blogger_custom_height();
		}
	);

	// Skin-specific resize actions
	jQuery( document ).on(
		'action.got_ajax_response', function() {

			// Init quantity value
			a_mart_skin_update_quantity_value();

			// Add margin depends on height
			a_mart_skin_add_product_custom_height();
			a_mart_skin_add_product_blogger_custom_height();
		}
	);
	// Skin-specific resize actions
	jQuery( document ).on(
		'action.resize_a_mart', function() {
		}
	);

	jQuery( document.body ).on( 'wc_cart_button_updated', function(e, selector){
		var jQueryButton = jQuery( selector.context );
		if ( jQuery('.content').find(".sc_blogger_product").length > 0 ) {
			var height = jQueryButton.parents( ".sc_blogger_item_footer" ).innerHeight();
			jQueryButton.parents( ".sc_blogger_item" ).find(".imagin_content_wrap").css({"margin-bottom": - + height });
		}

		if ( jQuery('.content').find(".product").length > 0 ) {
			var height = jQueryButton.parents( ".inner_product_wrap" ).innerHeight();
			jQueryButton.parents( ".product .post_item" ).find(".imagin_content_wrap").css({"margin-bottom": - + height });
		}
	});


})();
