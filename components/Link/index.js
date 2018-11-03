import React from 'react';
import Link from 'next/link'

const RealLink = ({ to, ...props }) => {
  return (
    <Link href={to}>
      <a {...props}/>
    </Link>
  );
};

export default RealLink;
