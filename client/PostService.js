import axios from 'axios'


const url = 'http://localhost:1017/api/posts/'


class PostService{

    static getPosts(){
        return new Promise(async(resolve,reject) =>{
            try{
                const res = await axios.get(url)
                const data = res.data
                resolve(
                    data.map(post => (
                        {
                            ...post,
                            createdAt: new Date(post.createdAt)
                        }
                    ))
                )
            }catch(err){
                reject(err)
            }
        })
    }

    static insertPost(text){
        return axios.post(url,{
            text:text
        })
    }

    static deletePost(id){
        return axios.delete(`${url}` + id)
    }

}


export default PostService