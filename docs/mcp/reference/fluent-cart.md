---
title: FluentCart
description: MCP tools provided by FluentCart (provider id fluent-cart).
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# FluentCart

Provider id: `fluent-cart` · 48 tool(s).

## `fcart_accept_order_dispute`

Accept a payment dispute/chargeback on an order transaction. Irreversible.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `order_id` | integer | yes |  |
| `transaction_id` | integer | yes |  |


## `fcart_add_custom_order_item`

Add a custom (ad-hoc) line item to an order. price is in cents.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `order_id` | integer | yes |  |
| `title` | string | yes |  |
| `price` | integer | yes | Unit price in cents. |
| `quantity` | integer | yes |  |


## `fcart_apply_coupon`

Apply a coupon code to order items (validates eligibility, recalculates discounts). Pass code/order context via extra.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `extra` | object | no | Apply payload (e.g. code, order_id) merged into the body. |


## `fcart_attach_wp_user`

Link a WordPress user to a FluentCart customer.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes |  |
| `user_id` | integer | yes | WordPress user ID. |


## `fcart_bulk_order_action`

Run a bulk action on orders. action e.g. delete_orders, change_order_status, change_shipping_status, capture_payments. Pass status etc. via extra.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `action` | string | yes |  |
| `order_ids` | array | yes |  |
| `extra` | object | no | Extra fields (e.g. status) merged into the body. |


## `fcart_cancel_subscription`

Cancel a subscription locally and with the remote payment gateway. Requires the parent order_id, the subscription_id, and a cancel_reason.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `order_id` | integer | yes | Parent order ID. |
| `subscription_id` | integer | yes | Subscription order ID. |
| `cancel_reason` | string | yes | Reason sent to the gateway on cancellation. |


## `fcart_change_order_customer`

Reassign an order to a customer. Pass customer_id for an existing customer, OR email (+ name fields) to create a new customer and assign. If both customer_id and email are provided, email takes precedence and a new customer is created.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `order_id` | integer | yes |  |
| `customer_id` | integer | no | Existing customer to assign. |
| `email` | string | no | New customer email (creates + assigns). |
| `first_name` | string | no |  |
| `last_name` | string | no |  |


## `fcart_create_coupon`

Create a coupon. type: fixed|percentage|free_shipping|buy_x_get_y. amount: cents for fixed, 0-100 for percentage. status/stackable/show_on_checkout are REQUIRED by FluentCart and default to active/no/no. Use extra for conditions (object), priority, start_date/end_date, notes.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes |  |
| `code` | string | yes |  |
| `type` | string | yes | fixed or percentage. |
| `amount` | number | yes | Cents for fixed; 0-100 for percentage. |
| `status` | string | no | active, expired, disabled, or scheduled (default active). |
| `stackable` | string | no | yes or no (default no). |
| `show_on_checkout` | string | no | yes or no (default no). |
| `extra` | object | no | Additional coupon fields (conditions object, priority, start_date/end_date, notes). |


## `fcart_create_customer`

Create a FluentCart customer. email is required; provide first_name+last_name or full_name.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `email` | string | yes |  |
| `first_name` | string | no |  |
| `last_name` | string | no |  |
| `full_name` | string | no |  |
| `extra` | object | no | Additional fields merged into the body. |


## `fcart_create_customer_address`

Add an address to a customer. Required address fields (name, email, address_1, city, country, type=billing|shipping) go in extra.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes |  |
| `extra` | object | no | Address fields merged into the body. |


## `fcart_create_order`

Create a FluentCart order. Requires customer_id and an order_items array. Use extra for additional fields.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes | Customer ID. |
| `order_items` | array | yes | Line items; each references the product/variation, e.g. \{ post_id, variation_id, object_id, quantity, unit_price \}. |
| `extra` | object | no | Additional order fields merged into the request body. |


## `fcart_create_product`

Create a FluentCart product (a default variation is generated automatically). title maps to post_title. fulfillment_type (digital|physical, default digital) is REQUIRED by FluentCart and is sent as detail.fulfillment_type. Use extra for more fields (e.g. post_status, or a full detail object).

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Product title. |
| `fulfillment_type` | string | no | digital or physical (default digital). Sent as detail.fulfillment_type, which FluentCart requires on create. |
| `extra` | object | no | Additional product fields merged into the body (e.g. post_status, or your own detail object). |


## `fcart_create_product_variant`

Create a product variation. Pass product_id and variation fields via extra.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `extra` | object | no | Variation fields (incl. product_id) merged into the body. |


## `fcart_delete_coupon`

Permanently delete a coupon.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `coupon_id` | integer | yes | Coupon ID. |


## `fcart_delete_customer_address`

Delete a customer address.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes |  |
| `address_id` | integer | yes |  |


## `fcart_delete_order`

Permanently delete a FluentCart order and all associated data.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `order_id` | integer | yes |  |


## `fcart_delete_product`

Delete a product and all associated data.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `product_id` | integer | yes |  |


## `fcart_delete_product_variant`

Delete a product variation.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `variant_id` | integer | yes |  |


## `fcart_detach_wp_user`

Remove the WordPress user link from a FluentCart customer.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes |  |


## `fcart_duplicate_product`

Duplicate a product.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `product_id` | integer | yes |  |


## `fcart_get_coupon`

Get a FluentCart coupon by ID.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `coupon_id` | integer | yes | Coupon ID. |


## `fcart_get_customer`

Get a FluentCart customer by ID.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes | Customer ID. |


## `fcart_get_customer_orders`

List the orders belonging to a FluentCart customer.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes | Customer ID. |


## `fcart_get_dashboard_stats`

Get FluentCart store dashboard statistics (revenue, orders, etc.; amounts in cents).

**Profiles:** `full`, `lean`, `cart`

**Parameters**

_No parameters._


## `fcart_get_order`

Get a FluentCart order by ID (amounts in cents).

**Profiles:** `full`, `lean`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `order_id` | integer | yes | Order ID. |


## `fcart_get_order_transactions`

List an order's transactions, or get one transaction when transaction_id is given.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `order_id` | integer | yes | Order ID. |
| `transaction_id` | integer | no | Optional transaction ID for a single transaction. |


## `fcart_get_product`

Get a FluentCart product by ID (pricing in cents).

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `product_id` | integer | yes | Product ID. |


## `fcart_get_product_pricing`

Get a product's full detail: pricing, variants, and downloadable files (amounts in cents).

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `product_id` | integer | yes | Product ID. |


## `fcart_get_subscription`

Get a subscription by its subscription order ID (includes customer, labels, related orders).

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `subscription_id` | integer | yes | Subscription order ID. |


## `fcart_list_coupons`

List FluentCart discount coupons with optional search and pagination.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `per_page` | integer | no | Items per page (default 10). |
| `page` | integer | no | Page number. |


## `fcart_list_customers`

List FluentCart customers with optional search and pagination.

**Profiles:** `full`, `lean`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search by name or email. |
| `sort_by` | string | no | Column to sort by. |
| `per_page` | integer | no | Items per page (default 10). |
| `page` | integer | no | Page number. |


## `fcart_list_orders`

List FluentCart orders. Amounts are in cents. Filter by order status and search; paginate with page/per_page.

**Profiles:** `full`, `lean`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `status` | string | no | Filter by order status (e.g. completed, processing, refunded). |
| `sort_by` | string | no | Column to sort by. |
| `sort_type` | string | no | asc or desc. |
| `per_page` | integer | no | Items per page (default 10). |
| `page` | integer | no | Page number. |


## `fcart_list_products`

List FluentCart products with optional search and pagination.

**Profiles:** `full`, `lean`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `per_page` | integer | no | Items per page (default 10). |
| `page` | integer | no | Page number. |


## `fcart_list_routes`

List the FluentCart REST routes registered under /fluent-cart/v2 and their HTTP methods. Optional "search" substring filter and "limit" (1-500, default 200). Use this to find a path for fcart_request.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Only return routes whose path contains this substring. |
| `limit` | integer | no | Max routes to return (1-500, default 200). |


## `fcart_list_subscriptions`

List FluentCart subscriptions with optional search, filtering, and pagination (amounts in cents).

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `status` | string | no | Filter by subscription status. |
| `per_page` | integer | no | Items per page (default 10). |
| `page` | integer | no | Page number. |


## `fcart_mark_order_paid`

Mark an order as paid (creates/updates a transaction record). Pass transaction reference data via extra.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `order_id` | integer | yes |  |
| `extra` | object | no | Transaction reference fields (e.g. payment_method, transaction reference). |


## `fcart_refund_order`

Refund an order. IMPORTANT: amount is in DECIMAL major units (e.g. 19.99), NOT cents. Can also cancel subscriptions. transaction_id targets the transaction to refund.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `order_id` | integer | yes |  |
| `transaction_id` | integer | yes | Transaction to refund. |
| `amount` | number | yes | Refund amount in DECIMAL major units (e.g. 19.99), not cents. |
| `note` | string | no | Optional refund note. |


## `fcart_request`

Call any FluentCart REST route (scoped to /fluent-cart/v2). GET runs immediately; POST/PUT/PATCH/DELETE require "confirm": true, or pass "dry_run": true to preview the request. Use fcart_list_routes to discover available paths.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `method` | string | yes | HTTP method: GET, POST, PUT, PATCH, or DELETE. |
| `path` | string | yes | Route path within /fluent-cart/v2, e.g. /fluent-cart/v2/contacts or /fluent-cart/v2/contacts/42. |
| `body` | object | no | Request body for writes (JSON object). |
| `query` | object | no | Query-string arguments (JSON object). |
| `confirm` | boolean | no | Required to execute a write (POST/PUT/PATCH/DELETE). |


## `fcart_resync_subscription`

Resync subscription data from the remote payment gateway. Requires the parent order_id and subscription_id.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `order_id` | integer | yes | Parent order ID. |
| `subscription_id` | integer | yes | Subscription order ID. |


## `fcart_set_primary_customer_address`

Mark a customer address as primary.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes |  |
| `address_id` | integer | yes |  |


## `fcart_update_coupon`

Update a coupon. Provide changed fields via extra. When updating amount, units depend on type: cents for fixed, 0-100 for percentage.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `coupon_id` | integer | yes |  |
| `extra` | object | no | Coupon fields to update (title, code, type, amount, status, stackable, show_on_checkout, dates...). |


## `fcart_update_customer`

Update a FluentCart customer. email must stay unique. Provide fields to change; use extra for more.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes |  |
| `email` | string | no |  |
| `first_name` | string | no |  |
| `last_name` | string | no |  |
| `full_name` | string | no |  |
| `extra` | object | no | Additional fields to update, merged into the body. |


## `fcart_update_customer_address`

Update a customer address. Pass address_id and changed fields (via extra).

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes |  |
| `address_id` | integer | yes |  |
| `extra` | object | no | Address fields to update, merged into the body. |


## `fcart_update_order`

Update a FluentCart order (POST, not PUT). Subscription orders cannot be edited. Use extra for additional fields.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `order_id` | integer | yes |  |
| `customer_id` | integer | no |  |
| `order_items` | array | no |  |
| `extra` | object | no | Additional order fields merged into the request body. |


## `fcart_update_order_status`

Change an order's status. action is change_order_status or change_shipping_status; statuses is the new status object.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `order_id` | integer | yes |  |
| `action` | string | yes | change_order_status or change_shipping_status. |
| `statuses` | object | yes | New status payload. |


## `fcart_update_product`

Update a product's details, variants, pricing, and metadata (FluentCart routes this through the pricing endpoint). Pass fields via extra.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `product_id` | integer | yes |  |
| `extra` | object | no | Product fields (details/variants/metadata) merged into the body. |


## `fcart_update_product_inventory`

Update stock levels for a specific variant. Pass stock fields (e.g. total_stock) via extra.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `product_id` | integer | yes |  |
| `variant_id` | integer | yes |  |
| `extra` | object | no | Stock fields merged into the body. |


## `fcart_update_product_variant`

Update a product variation. Pass fields via extra.

**Profiles:** `full`, `cart`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `variant_id` | integer | yes |  |
| `extra` | object | no | Variation fields merged into the body. |

