
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler( req: NextApiRequest,
    res: NextApiResponse) {
	if (req.method === 'GET') {
		const options: any = {
			method: 'GET',
			url: 'https://qrcodeutils.p.rapidapi.com/qrcodefree',
			params: {
				text: "31d85f20bea",
				validate: 'true',
				size: '350',
				type: 'svg', // type: svg, png etc
				level: 'M' // level of validation
			},
			headers: {
				'x-rapidapi-host': 'qrcodeutils.p.rapidapi.com',
				'x-rapidapi-key': '31d85f20bea'
			}
		};

		axios.request(options)
			.then(function (response) { 

                console.log(response.data)

				res.status(200).json(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	} else {
		res.status(400);
	}
}