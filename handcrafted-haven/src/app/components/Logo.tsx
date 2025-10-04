import React from "react";
import Link from "next/link.js";
import Image from "next/image.js";


const Logo = () => {
  return (
    <div>
        <Link href="/">
            <Image
                src="/images/hand-logo.png"
                alt="Handcrafted Haven Logo"
                width = {350}
                height={45}
                priority
              />
        </Link>      
    </div>
  );
};

export default Logo;