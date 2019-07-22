import React from 'react';
import styled from 'styled-components';
import Colors from '../Common/Colors';
import { Devices } from '../Common'

const Footer = () => (
  <Wrapper hideOnMobile>
    <Text>
      {'Have a question? Contact us via '}
      <LinkedText>
        <a target="_blank" href="https://twitter.com/tzstats">
          Twitter
        </a>
      </LinkedText>
      {' or '}
      <LinkedText>
        <a target="_blank" href="https://discord.gg/D5e98Hw">
          Discord
        </a>
      </LinkedText>
    </Text>
    <Text>Terms & Conditions</Text>
    <Text>Privacy Policy</Text>
  </Wrapper>
);
export default Footer;

const Wrapper = styled.div`
  color: ${Colors.LIGHT_GRAY5};
  font-size: 10px;
  text-align: center;
  height: 30px;
  padding: 10px 0;
  margin-top: 100px;
  @media ${Devices.mobileL} {
    ${props => props.hideOnMobile && "display: none;"}
  }
`;

const LinkedText = styled.span`
  color: #fff;
  cursor: pointer;
`;

const Text = styled.span`
  padding-right: 50px;
  color: rgba(255, 255, 255, 0.52);
`;