import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PopupContainer } from './popupStyled';

const Popup = () => {
  return (
    <PopupContainer>
      <div className='top'>
        <p>Resource alerts</p>
        <AiOutlineCloseCircle />
      </div>
      <hr />
      <div className='content'>
        <div className='subContent'>
          <div className='leftCon'>
            <h4>Resources</h4>
            <h6>Maine</h6>

            <p>Frequency: Daily via email and notification</p>
            <p>Get notified of similar Resources: Yes</p>
          </div>
          <div className='rightCon'>
            <img
              src='https://cdn-icons-png.flaticon.com/128/1659/1659682.png'
              alt=''
            />
            <img
              src='https://cdn-icons-png.flaticon.com/128/1345/1345823.png'
              alt=''
            />
          </div>
        </div>
        <div className='subContent'>
          <div className='leftCon'>
            <h4>resource at India</h4>
            <h6>India</h6>

            <p>Frequency: Daily via email and notification</p>
            <p>Get notified of similar Resources: Yes</p>
          </div>
          <div className='rightCon'>
            <img
              src='https://cdn-icons-png.flaticon.com/128/1659/1659682.png'
              alt=''
            />
            <img
              src='https://cdn-icons-png.flaticon.com/128/1345/1345823.png'
              alt=''
            />
          </div>
        </div>
      </div>
      <hr />
      <div className='bottom'>
        <div className='leftB'>
          <h4>Resources recommendations</h4>
          <h6>
            Based on your Resources alerts, activity, and profile.{' '}
            <span className='blue'>Learn more.</span>{' '}
          </h6>
        </div>
        <div className='rightB'>
          <label class='switch'>
            <input type='checkbox' />
            <span class='slider round'></span>
          </label>
        </div>
      </div>
      <hr />
      <button>Done</button>
    </PopupContainer>
  );
};

export default Popup;
