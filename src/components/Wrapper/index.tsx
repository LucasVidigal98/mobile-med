import React from 'react';
import { Wrapper } from './styles';

const WrapperScreen:React.FC = (props) => {
    return (
       <Wrapper>
           {props.children}
       </Wrapper>
    )
}

export default WrapperScreen;
