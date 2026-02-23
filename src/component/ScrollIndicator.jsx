import React from 'react';
import Image from 'next/image';

const ScrollIndicatot = () => {
  return (
    <div>
      <Image
        src='/image/dot.png'
        alt=''
        width={400}
        height={300}
        className='w-full h-48 object-cover rounded-xl'
      />
    </div>
  );
};

export default ScrollIndicatot;
