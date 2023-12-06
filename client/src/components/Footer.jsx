import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-neutral-100 text-center grid grid-rows-between text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
        <div className="flex items-center justify-center border-b-2 border-neutral-200 p-3 dark:border-neutral-500 lg:justify-between">
          <div className="mr-12 hidden lg:block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div className="flex justify-center">
            {/* Social network icons */}
            {/* Include your social media icons here */}
          </div>
        </div>

        <div className="mx-6 py-2 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="">
              <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                TW elements
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>
            <div className="">
              <h6 className="mb-2 flex justify-center font-semibold uppercase md:justify-start">
                Products
              </h6>
              <p className="mb-2">
                <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                  Product 1
                </a>
              </p>
              <p className="mb-2">
                <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                  Product 2
                </a>
              </p>
              <p className="mb-2">
                <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                  Product 3
                </a>
              </p>
              <p>
                <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                  Product 4
                </a>
              </p>
            </div>
            <div className="">
              <h6 className="mb-2 flex justify-center font-semibold uppercase md:justify-start">
                Useful links
              </h6>
              <p className="mb-2">
                <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                  Pricing
                </a>
              </p>
              <p className="mb-2">
                <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                  Settings
                </a>
              </p>
              <p className="mb-2">
                <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                  Help
                </a>
              </p>
            </div>
            {/* Contact section */}
            <div>
              <h6 className="mb-2 flex justify-center font-semibold uppercase md:justify-start">
                Contacts
              </h6>
              <p className="mb-2">
                <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                  Youtube
                </a>
              </p>
              <p className="mb-2">
                <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                  Twitter
                </a>
              </p>
              <p className="mb-2">
                <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                  Tiktok
                </a>
              </p>
              <p>
                <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                Facebook
                </a>
              </p>
            </div>
          </div>
        </div>
    <div className="grid items-center">
        <div className=" text-center dark:bg-neutral-700 ">
          <span>© 2023 Copyright:</span>
          <a
            className="font-semibold text-neutral-600 dark:text-neutral-400"
            href="https://tw-elements.com/"
          >
            TW elements
          </a>
        </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
