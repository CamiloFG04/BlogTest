import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { AiFillTags, AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai';
import { Modal, Button } from "react-bootstrap";

const url = 'https://dummyapi.io/data/v1/'

const ShowBlog = () => {

    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [searchTag, setSearchTag] = useState('');
    const [modal, setModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [modalComment, setModalComment] = useState(false);

    const handleCloseComment = () => setModalComment(false);
    useEffect(() => {
        getPosts()
        getTags()
    }, [])

    useEffect(() => {
        if (searchTag != '') {
            getPostsByTag()
        } else {
            getPosts()
        }
    }, [searchTag])

    const getPosts = async () => {
        const res = await axios.get(`${url}post`, {
            headers: {
                'app-id': '63111e65f7516ed196c0d469'
            }
        })
        setPosts(res.data.data)
    }
    const getPostsByTag = async () => {
        const res = await axios.get(`${url}tag/${searchTag}/post`, {
            headers: {
                'app-id': '63111e65f7516ed196c0d469'
            }
        })
        setPosts(res.data.data)
    }

    const getTags = async () => {
        const res = await axios.get(`${url}tag`, {
            headers: {
                'app-id': '63111e65f7516ed196c0d469'
            }
        })
        setTags(res.data.data)
    }

    const getCommentsByPost = async (id) => {
        const res = await axios.get(`${url}post/${id}/comment`, {
            headers: {
                'app-id': '63111e65f7516ed196c0d469'
            }
        })
        console.log(res);
        setComments(res.data.data)
    }

    const showModalComment = (flag, id) => {
        setModalComment(flag)
        getCommentsByPost(id)

    }

    const showModal = (flag) => {
        setModal(flag)
    }
    const handleClose = () => setModal(false);

    return (
        <div>
            <h1>Posts</h1>
            <div className="container text-center">
                <div className="row align-items-start">
                    <div className="col d-flex">
                        <input className="form-control me-2" type="search" placeholder="Filter" aria-label="Search" onChange={event => { setSearchTag(event.target.value) }} />
                        <Button className="btn btn-success text-light" onClick={() => showModal(true)}>List</Button>
                    </div>
                </div>
            </div>
            <div className="row">
                {Array.from(posts).map((post) => (
                    <div className="col-md-6 p-4" key={post.id}>
                        <a className="text-decoration-none text-dark" href="#" onClick={() => showModalComment(true, post.id)}>
                            <div className="card">
                                <img src={post.image} className="card-img-top" style={{ height: '300px' }} alt="..." />
                                <div className="card-body">
                                    <p className="card-text text-start text-secondary"><AiFillTags />{post.tags.map((tag) => ('#' + tag + '\u00A0'))}</p>
                                    <h5 className="card-title text-start">{post.text}</h5>
                                    <p className="card-text text-start fs-6 fst-italic"><AiOutlineUser /> {post.owner.firstName} {post.owner.lastName} /     <AiOutlineCalendar /> {format(new Date(post.publishDate), 'dd/mm/yyyy')}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            <Modal show={modal} onHide={handleClose}>
                <Modal.Header>
                    <h5 className="modal-title" id="exampleModalLabel">Tags</h5>
                    <button type="button" className="btn" aria-label="Close" onClick={() => showModal(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {Array.from(tags).map((tag, i) => (
                            <li key={i}>{tag != null && tag.length <= 20 ? tag : ''}</li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => showModal(false)}>Cerrar</button>
                </Modal.Footer>
            </Modal>
            <Modal show={modalComment} onHide={handleCloseComment}>
                <Modal.Header>
                    <h5 className="modal-title" id="exampleModalLabel">Comments</h5>
                    <button type="button" className="btn" aria-label="Close" onClick={() => showModalComment(false)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    {Array.from(comments).map((comment, i) => (
                        <div className="row" key={comment.id}>
                            <div className="col-md-1">
                                <img src={comment.owner.picture} className="rounded-circle" alt="Cinque Terre" width="30" height="30" />
                            </div>
                            <div className="col-md-11">

                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h6 className="card-subtitle mb-2 text-muted">{comment.owner.firstName} {comment.owner.lastName} / <AiOutlineCalendar /> {format(new Date(comment.publishDate), 'dd/mm/yyyy')}</h6>
                                        <h5 className="card-title">{comment.message}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => showModalComment(false)}>Cerrar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ShowBlog