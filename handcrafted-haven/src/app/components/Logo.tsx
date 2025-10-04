import React from "react";
import Link from "next/link.js";
import Image from "next/image.js";


const Logo = () => {
  return (
    <div>
        <Link href="/">
            <Image
                src="/images/logo.png"
                alt="Handcrafted Haven Logo"
                width={200}
                height={100}
                priority
              />
        </Link>      
    </div>
  );
};

export default Logo;