import { createReactEditorJS } from 'react-editor-js'
import React from 'react'
import Quote from '@editorjs/quote'
import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Table from '@editorjs/table'
import Link from '@editorjs/link'
import Marker from '@editorjs/marker'
const CodeBox = require('@bomdi/codebox')
import Underline from '@editorjs/underline'
const Header = require('@editorjs/header')

export default function Editor() {
	const Editor = createReactEditorJS()
	const editorTools = {
		header: {
			class: Header,
			config: {
				defaultLevel: 2,
			}
		},
		embed: {
			class: Embed,
			services: {
				youtube: true,
				instagram: true,
				twitter: true,
			}
		},
		list: List,
		quote: Quote,
		table: Table,
		link: Link,
		underline: Underline,
		marker: Marker,
		codeBox: {
      class: CodeBox,
      config: {
				themeURL: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css',
				themeName: 'atom-one-dark',
				useDefaultTheme: 'light not-prose'
      }
		},
	}

	const editorCore = React.useRef(null)

	const handleInitialize = React.useCallback((instance) => {
  	editorCore.current = instance
	}, [])

	const handleSave = React.useCallback(async () => {
  const savedData = await editorCore.current.save();
	}, [])
	
	return(
		<>
		<Editor onInitialize={handleInitialize} holder="editorjs" tools={editorTools}>
			<div id="editorjs" className="p-4 container mx-auto border min-h-[80vh] prose mx-auto"></div>
		</Editor>
		<button onClick={handleSave}>Save</button>
		<pre>{JSON.stringify(editorCore)}</pre>
		</>
	)
}
