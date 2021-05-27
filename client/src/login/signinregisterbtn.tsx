import React, { useState } from 'react';
import { Registration } from './register';
import { Signin } from './signin';
import './signinregisterbtn.scss';

export const SigninRegisterbtn = () => {
  const [signOrReg, setSignOrReg] = useState<boolean>(true)
  // const switchBtn = () => {
  //   if (!signOrReg) {
  //     setSignOrReg(true);
  //   } else if (signOrReg) {
  //     setSignOrReg(false);
  //   } else setSignOrReg(false);
  // }
  return <div id="background"><div id="container"><div id="signIn"><Signin /></div><div id="registration"><Registration /></div></div>
    {/* <button onClick={() => switchBtn()}>Back and forth</button> */}
  </div>
}

//make one component in the middle that switches between login and registeration
//create button that switches between signin and registration
