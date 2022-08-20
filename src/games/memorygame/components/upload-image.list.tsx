import React from 'react';
import { BasePropertyProps } from 'admin-bro';
import { Box } from '@admin-bro/design-system';

const Edit: React.FC<BasePropertyProps> = (props) => {
	console.log(props);

	const { record } = props;

	console.log('whyyyy?', record);

	const srcImg = record?.params.Photos;

	return <Box>{srcImg ? <img src={srcImg} width='100px' /> : 'no image </3'}</Box>;
};

export default Edit;
