import React from 'react'

const Footer = () => {
  return (
    <div>
         <footer className="bg-blue-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          {/* Column 2 */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul className="list-none text-sm">
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>
          {/* Column 3 */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Policy</h3>
            <ul className="list-none text-sm">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
          {/* Column 4 */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4">Connect with Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-sm">Facebook</a>
              <a href="#" className="text-sm">Twitter</a>
              <a href="#" className="text-sm">Instagram</a>
              <a href="#" className="text-sm">LinkedIn</a>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-8 text-sm text-center">
          &copy; 2024 BidForSneaks. All Rights Reserved.
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer