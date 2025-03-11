import React from 'react';
import { Road } from './Road'; // Adjust the import path if necessary
import { Vector3 } from 'three';

const X1 = -400
const X2 = 700
const Z1 = -500
const Z2 = 1700

const Roads: React.FC = () => {
  return (
    <>
      
      <Road 
        start={new Vector3(520 , -98, -835)} 
        end={new Vector3(520 , 0, 900)} 
        width={360} 
        color="#444" 
      />
      
      <Road 
        start={new Vector3(350 , -98, -200)} 
        end={new Vector3(178 , 0, -200)} 
        width={74 } 
        color="#444" 
      />

    </>
  );
};

export default Roads; 