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
      
      
      {/* main entry*/}
      <Road 
        start={new Vector3(950 , -98, -945)} 
        end={new Vector3(950 , 0, 2510)} 
        width={420} 
        color="#444" 
      />
      

      {/* main entry 2 */}
      <Road 
        start={new Vector3(720 , -98, -90)} 
        end={new Vector3(720 , 0, 2510)} 
        width={180} 
        color="#444" 
      />

      {/* first left  */}

      <Road 
        start={new Vector3(750 , -98, 1970)} 
        end={new Vector3(-800 , 0, 1970)} 
        width={350} 
        color="#444" 
      />


      {/* 2nd left  */}

      <Road 
        start={new Vector3(750 , -98, 702)} 
        end={new Vector3(-800 , 0, 702)} 
        width={130} 
        color="#444" 
      />


      {/* main ground 4th left  */}

      <Road 
        start={new Vector3(750 , -98, -780)} 
        end={new Vector3(-1530 , 0, -770)} 
        width={350} 
        color="#444" 
      />


      {/* main ground entry */}
      <Road 
        start={new Vector3(-275 , -98, -1100)} 
        end={new Vector3(-275 , 0, -700)} 
        width={200} 
        color="#444" 
      />


      {/* 2nd right (cafe main) */}

      <Road 
        start={new Vector3(1350 , -98, 150)} 
        end={new Vector3(800 , 0, 150)} 
        width={300} 
        color="#444" 
      />


      {/* 2nd right back (cafe main) */}

      <Road 
        start={new Vector3(1700 , -98, 150)} 
        end={new Vector3(1300 , 0, 150)} 
        width={300} 
        color="#444" 
      />


      {/* first right (cafe) */}

      <Road 
        start={new Vector3(1775 , -98, 950)} 
        end={new Vector3(1000 , 0, 950)} 
        width={150} 
        color="#444" 
      />

      {/* cafe right la side road*/}
      <Road 
        start={new Vector3(1730 , -98, -930)} 
        end={new Vector3(1710 , 0, 1000)} 
        width={100} 
        color="#444" 
      />

      {/* 3rd right (cafe) */}

      <Road 
        start={new Vector3(1750 , -98, -885)} 
        end={new Vector3(1000 , 0, -885)} 
        width={120} 
        color="#444" 
      />


      {/* basket ball pora road*/}
      <Road 
        start={new Vector3(980 , -98, -2450)} 
        end={new Vector3(980 , 0, -900)} 
        width={200} 
        color="#444" 
      />

      {/* basket ball right back road*/}
      <Road 
        start={new Vector3(1760 , -98, -2450)} 
        end={new Vector3(1760 , 0, -1250)} 
        width={80} 
        color="#444" 
      />

      {/* 4rd right (basket) */}

      <Road 
        start={new Vector3(1750 , -98, -1290)} 
        end={new Vector3(1000 , 0, -1288)} 
        width={80} 
        color="#444" 
      />

      {/* 5th right (basket) */}

      <Road 
        start={new Vector3(1000 , -98, -2136)} 
        end={new Vector3(1300 , 0, -2137)} 
        width={120} 
        color="#444" 
      />

      {/* 6rd right (basket last) */}

      <Road 
        start={new Vector3(1750 , -98, -2391)} 
        end={new Vector3(1000 , 0, -2392)} 
        width={120} 
        color="#444" 
      />

      {/* left side back side road */}
      <Road 
        start={new Vector3(-1440 , -98, -630)} 
        end={new Vector3(-1442 , 0, 1510)} 
        width={180} 
        color="#444" 
      />

      {/* 3rd left back left  */}

      <Road 
        start={new Vector3(650 , -98, 10)} 
        end={new Vector3(-1400 , 0, 10)} 
        width={200} 
        color="#444" 
      />


      {/* block 1 entry */}
      <Road 
        start={new Vector3(205 , -98, -200)} 
        end={new Vector3(205 , 0, 50)} 
        width={100} 
        color="#444" 
      />

      {/* block 2 entry */}
      <Road 
        start={new Vector3(-310 , -98, -200)} 
        end={new Vector3(-310 , 0, 50)} 
        width={100} 
        color="#444" 
      />


      {/* block 3 entry */}
      <Road 
        start={new Vector3(-825 , -98, -200)} 
        end={new Vector3(-825 , 0, 50)} 
        width={100} 
        color="#444" 
      />



      {/* office back side entry */}
      <Road 
        start={new Vector3(-1108 , -98, 800)} 
        end={new Vector3(-1108 , 0, 820)} 
        width={44} 
        color="#444" 
      />


      {/* office back side entry left  */}

      <Road 
        start={new Vector3(-1100 , -98, 800)} 
        end={new Vector3(-1500 , 0, 800)} 
        width={80} 
        color="#444" 
      />


      {/* office side entry left  */}

      <Road 
        start={new Vector3(-200 , -98, 1437)} 
        end={new Vector3(-1500 , 0, 1435)} 
        width={150} 
        color="#444" 
      />

      {/* office left side la entry */}
      <Road 
        start={new Vector3(-1050 , -98, 1200)} 
        end={new Vector3(-1050 , 0, 1400)} 
        width={60} 
        color="#444" 
      />
      
      {/* office left entry */}
      <Road 
        start={new Vector3(-200 , -98, 980)} 
        end={new Vector3(-200 , 0, 1505)} 
        width={100} 
        color="#444" 
      />


      {/* office right mini entry */}
      <Road 
        start={new Vector3(-90 , -98, 430)} 
        end={new Vector3(-90 , 0, 700)} 
        width={50} 
        color="#444" 
      />


      {/* office right mini 1 entry  */}

      <Road 
        start={new Vector3(-100 , -98, 574)} 
        end={new Vector3(-170 , 0, 574)} 
        width={35} 
        color="#444" 
      />

      {/* office right mini 2 entry  */}

      <Road 
        start={new Vector3(-100 , -98, 446)} 
        end={new Vector3(-500 , 0, 446)} 
        width={50} 
        color="#444" 
      />

      {/* office left mini entry  */}

      <Road 
        start={new Vector3(-155 , -98, 955)} 
        end={new Vector3(-600 , 0, 955)} 
        width={50} 
        color="#444" 
      />

      {/* office to left move 1st entry */}
      <Road 
        start={new Vector3(-179.5 , -98, 760)} 
        end={new Vector3(-180 , 0, 930)} 
        width={60} 
        color="#444" 
      />

    </>
  );
};

export default Roads; 