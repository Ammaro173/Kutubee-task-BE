import React from 'react';
import { Label, Box, DropZone, DropZoneProps, DropZoneItem } from '@admin-bro/design-system';
import { BasePropertyProps } from 'admin-bro';

const Edit: React.FC<BasePropertyProps> = (props) => {
	const { property, onChange, record } = props;

	const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
		onChange(property.name, files[0]);
	};

	const uploadedPhoto = record?.params.profilePhotoLocation;
	console.log('uploadedPhoto', uploadedPhoto);

	const photoToUpload = record?.params[property.name];
	console.log('photoToUpload', record?.params[property.name]);

	return (
		<Box marginBottom='xxl'>
			<Label>{property.name}</Label>
			<DropZone onChange={handleDropZoneChange} />

			{uploadedPhoto && !photoToUpload && <DropZoneItem src={uploadedPhoto} />}
		</Box>
	);
};

export default Edit;
