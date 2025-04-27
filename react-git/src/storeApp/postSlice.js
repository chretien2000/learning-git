import {createSelector,
        createEntityAdapter} from '@reduxjs/toolkit'
import {sub} from 'date-fns'
import { mySlice } from './Api/QuerySlice'
    
const postAdapter=createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
})
const initialState=postAdapter.getInitialState()

export const ExtendedSlice=mySlice.injectEndpoints({
  endpoints:(builder)=>({
    getPost:builder.query({
        query:()=>'/posts',
        transformResponse:responseData=>{
            let min=1;
            const loadedPost=responseData.map(post=>{
                const basepost={...post,
                    date:post?.date||sub(new Date(),{minutes:min++}).toISOString(),
                    reactions:post?.reactions||{thumbsup:0,
                                               wow:0,heart:0,
                                               rocket:0,coffee:0}}
                        return basepost})
            return postAdapter.setAll(initialState,loadedPost)
        },
        providesTags:(result,undefined,arg)=>  [
            {type:'post',id:'LIST'}, ...result.ids.map(id=>({type:'post',id}))]
    }),
    getPostById:builder.query({
        query:(postId)=>`/posts/?userId=${postId}`,
        transformResponse:responseData=>{
            let min=1;
            const loadedpost=responseData.map(post=>{
                const basePost={...post,
                    date:post?.date||sub(new Date(),{minutes:min++}).toISOString(),
                    reactions:post?.reactions||{thumbsup:0,
                        wow:0,heart:0,
                        rocket:0,coffee:0}}
            return basePost
            })
            return postAdapter.setAll(initialState,loadedpost)},
            providesTags:(result,undefined,arg)=>[
                ...result.ids.map(id=>({type:'post',id}))]
            }),
            addnewPost:builder.mutation({
                query:(post)=>{
                    console.log(post)
                    return {
                    url:'posts',
                    method:'POST',
                    body:{...post,
                        date:post?.date||new Date().toISOString(),
                        reactions:post?.reactions||{thumbsup:0,
                            wow:0,heart:0,
                            rocket:0,coffee:0}
                    }
                    
                }},
                invalidatesTags:[{type:'post',id:'LIST'}]
            }),
            updatePost:builder.mutation({
                query:(post)=>({
                    url:`/posts/${post.id}`,
                    method:'PUT',
                    body:{...post,
                        date:post?.date||new Date().toISOString(),
                        reactions:post?.reactions ||{thumbsup:0,
                            wow:0,heart:0,
                            rocket:0,coffee:0}
                    }
                }),
                invalidatesTags:(result,err,arg)=>[
                    {type:'post',id:arg.id}
                ]
            }),
            deletePost:builder.mutation({
                query:({id})=>({
                    url:`/posts/${id}`,
                    method:'DELETE'
                }),
                invalidatesTags:(result,err,arg)=>[{type:'post',id:arg.id}]
            }),
            countReactions:builder.mutation({
                query:({id,reactions})=>({
                    url:`posts/${id}`,
                    method:'PATCH',
                    body:{reactions}
                }),
                invalidatesTags:(result,err,arg)=>[{type:'post',id:arg.id}],
                onQueryStarted:async({id,reactions},{dispatch,queryFulfilled})=>{
                    const patchResult=dispatch(
                        ExtendedSlice.util.updateQueryData('getPost',undefined,draft=>{
                            const post=draft?.entities?.[id]
                            if(post){
                                post.reactions=reactions
                            }})
                    )
                     try{await queryFulfilled}
                     catch{patchResult.undo()}

                }
            })
  })  
})
export const{useGetPostQuery,useGetPostByIdQuery,
    useAddnewPostMutation,useCountReactionsMutation,
    useDeletePostMutation,useUpdatePostMutation}=ExtendedSlice
    export const selectPostResult=ExtendedSlice.endpoints.getPost.select()
     const selectPostData=createSelector(
        selectPostResult,postResult=>postResult?.data
    )

       export const {selectAll:selectAllPosts,
                     selectById:selectpostById,
                     selectIds:selectPostIds
       }=postAdapter.getSelectors(state=>selectPostData(state)??initialState)


