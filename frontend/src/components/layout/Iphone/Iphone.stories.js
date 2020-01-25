import React from 'react';
import Iphone from './Iphone';

export default {
  title: 'components|layout/Iphone', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Iphone, // 어떤 컴포넌트를 문서화 할지 명시
};

export const Default = () => <Iphone />;
