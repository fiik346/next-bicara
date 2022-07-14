import React, { useState } from 'react'
export default function Editor(props) {
	
	return(
		<div>
			<form>

				<div className="mb-4">
				<h2 className="text-sm text-gray-600 mb-2">Judul Postingan</h2>
				<input type="text" placeholder="Judul Postingan" className="px-4 py-2 border w-full" />
				</div>
				
				<div className="mb-4">
					<h2 className="text-sm text-gray-600 mb-2">Slug (url)</h2>
					<input type="text" className="border px-4 py-2 w-full" placeholder="ex: judul-postingan" />
				</div>

				<div className="mb-4">
				<h2 className="text-sm text-gray-600 mb-2">Isi Postingan</h2>
				<textarea height="320" width="100%" placeholder="" className="w-full h-64 border p-4" />
				</div>
			</form>
		</div>
	)
}
