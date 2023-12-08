import dynamic from 'next/dynamic';
 
 const IsoflowDynamic = dynamic(() => {
    return import('isoflow');
  },
  {
    ssr: false
  }
);

export default IsoflowDynamic;