import { DiscussionEmbed } from 'disqus-react';

export default function CommentsBox({slug, title}) {

  return (
    <div className="my-6" id="comments">
      {/*<div className="bg-gray-200 mb-4">
        <h3 className="px-4 py-2 text-sm rounded-r-lg bg-indigo-600 text-white inline-flex">Comments</h3>
      </div>*/
      }
      <DiscussionEmbed
        shortname='bicaranews'
        config={
          {
            url: `https://www.bicara.my.id/blog/${slug}`,
            identifier: slug,
            title: title,
            language: 'en_US' //e.g. for Traditional Chinese (Taiwan)	
          }
        }
      />
    </div>
  )
}
