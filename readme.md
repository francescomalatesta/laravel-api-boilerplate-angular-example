## Laravel API Boilerplate (JWT) Example Project: Book Wishlist

This is an example project I made with my [Laravel API Boilerplate (JWT)](https://github.com/francescomalatesta/laravel-api-boilerplate-jwt). A really basic books wishlist application, that uses AngularJS for the frontend client.

### How to Install

If possible, use [Homestead Improved](https://github.com/Swader/homestead_improved) as a VM.

* _git clone_ the repository;
* _composer install_ to install APIs dependencies;
* go to _public_ folder and _bower install_ to install client dependencies;
* _php artisan migrate_ to set up the database schema;
* have fun;

Yay.

### Notes

You could stumble upon some issues while creating the *bower_components* folder, create it manually in the _public_ folder. Don't worry, you're not alone: just create it manually and then execute _bower install_ normally.
