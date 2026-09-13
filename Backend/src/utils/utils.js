import crypto from "crypto";

export function generateOTP() {
  return crypto.randomInt(100000, 1000000).toString();
}

export function getOtpHtml(otp) {
  return `
    <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style type="text/tailwindcss">
      @theme {
        --color-clifford: #da373d;
      }
    </style>
  </head>
  <body>
    <div
      class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <div class="bg-white p-4 md:p-12 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl mt-8 font-bold text-center">Verify your email</h2>
        <p class="mt-6">
          You're one step away from scanning your first product and seeing
          what's really inside it.
        </p>
        <p class="mt-4">
          Enter the code below to activate your account. It's valid for 12
          hours.
        </p>

        <div
          class="gap-3 flex flex-col justify-center px-10 text-center text-2xl font-bold my-4 text-green-500 opacity-75 bg-green-100 p-2 rounded"
        >
          ${otp}
        </div>
        <h5 class="text-sm mt-3 mb-3 text-center text-gray-500">
          Didn't request this? You can safely ignore this email.
        </h5>
        <hr />
        <p class="mt-4 mb-2 text-sm text-gray-600">
          NutriScan scans a barcode and tells you, in seconds, whether a product
          is Healthy, Moderate, or Unhealthy — using open product data.
        </p>
      </div>
    </div>
  </body>
</html>
`;
}
