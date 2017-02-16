import React from 'react';

const Loading = () => (
	<section className='hero is-fullheight'>
    <svg width='120px' height='120px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' className='margin-auto'>
      <rect x='0' y='0' width='100' height='100' fill='none'></rect>
      <rect x='15' y='15' width='20' height='20' fill='#047ab3'>
        <animate attributeName='fill' from='#047ab3' to='#00cde8' repeatCount='indefinite' dur='1s' begin='0.0s' values='#00cde8;#00cde8;#047ab3;#047ab3' keyTimes='0;0.1;0.2;1'></animate>
      </rect>
      <rect x='40' y='15' width='20' height='20' fill='#047ab3'>
        <animate attributeName='fill' from='#047ab3' to='#00cde8' repeatCount='indefinite' dur='1s' begin='0.125s' values='#00cde8;#00cde8;#047ab3;#047ab3' keyTimes='0;0.1;0.2;1'></animate>
      </rect>
      <rect x='65' y='15' width='20' height='20' fill='#047ab3'>
        <animate attributeName='fill' from='#047ab3' to='#00cde8' repeatCount='indefinite' dur='1s' begin='0.25s' values='#00cde8;#00cde8;#047ab3;#047ab3' keyTimes='0;0.1;0.2;1'></animate>
      </rect>
      <rect x='15' y='40' width='20' height='20' fill='#047ab3'>
        <animate attributeName='fill' from='#047ab3' to='#00cde8' repeatCount='indefinite' dur='1s' begin='0.875s' values='#00cde8;#00cde8;#047ab3;#047ab3' keyTimes='0;0.1;0.2;1'></animate>
      </rect>
      <rect x='65' y='40' width='20' height='20' fill='#047ab3'>
        <animate attributeName='fill' from='#047ab3' to='#00cde8' repeatCount='indefinite' dur='1s' begin='0.375' values='#00cde8;#00cde8;#047ab3;#047ab3' keyTimes='0;0.1;0.2;1'></animate>
      </rect>
      <rect x='15' y='65' width='20' height='20' fill='#047ab3'>
        <animate attributeName='fill' from='#047ab3' to='#00cde8' repeatCount='indefinite' dur='1s' begin='0.75s' values='#00cde8;#00cde8;#047ab3;#047ab3' keyTimes='0;0.1;0.2;1'></animate>
      </rect>
      <rect x='40' y='65' width='20' height='20' fill='#047ab3'>
        <animate attributeName='fill' from='#047ab3' to='#00cde8' repeatCount='indefinite' dur='1s' begin='0.625s' values='#00cde8;#00cde8;#047ab3;#047ab3' keyTimes='0;0.1;0.2;1'></animate>
      </rect>
      <rect x='65' y='65' width='20' height='20' fill='#047ab3'>
        <animate attributeName='fill' from='#047ab3' to='#00cde8' repeatCount='indefinite' dur='1s' begin='0.5s' values='#00cde8;#00cde8;#047ab3;#047ab3' keyTimes='0;0.1;0.2;1'></animate>
      </rect>
    </svg>
  </section>
);

export default Loading;
