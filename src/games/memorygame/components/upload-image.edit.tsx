import React from 'react';
import { Label, Box, DropZone, DropZoneProps } from '@admin-bro/design-system';
import { BasePropertyProps } from 'admin-bro';

const Edit: React.FC<BasePropertyProps> = (props) => {
	const { property, onChange, record } = props;
	// console.log('?!?!??!', props);

	const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
		onChange(property.name, files[0]);
		// record?.update(record?.params[property.name]);
	};

	const photoToUpload = record?.params[property.name];
	// console.log('photoToUpload', record?.params[property.name]);

	// const uploadedPhoto = record?.params.profilePhotoLocation;
	// console.log('uploadedPhoto', uploadedPhoto);

	return (
		<Box marginBottom='xxl'>
			<Label marginTop='l'>{property.label}</Label>
			<DropZone onChange={handleDropZoneChange} />
			{/* {photoToUpload && <DropZoneItem src={photoToUpload} />} */}

			{/* <form method='post'>hi</form> */}

			{/* 
			<Label marginTop='xxl'>{property.label}</Label>
			<DropZone onChange={handleDropZoneChange} />
			{uploadedPhoto && !photoToUpload && <DropZoneItem src={uploadedPhoto} />}

			<Label marginTop='xxl'>{property.label}</Label>
			<DropZone onChange={handleDropZoneChange} />
			{uploadedPhoto && !photoToUpload && <DropZoneItem src={uploadedPhoto} />}

			<Label marginTop='xxl'>{property.label}</Label>
			<DropZone onChange={handleDropZoneChange} />
			{uploadedPhoto && !photoToUpload && <DropZoneItem src={uploadedPhoto} />} */}
		</Box>
	);
};

export default Edit;
