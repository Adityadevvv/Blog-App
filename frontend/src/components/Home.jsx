import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
  Modal,
  TextField,
} from '@mui/material';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  // Fetch all blogs
  const fetchBlogs = () => {
    axios
      .get('http://localhost:3001/posts')
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`)
      .then(() => fetchBlogs())
      .catch((err) => console.log(err));
  };

  const handleUpdate = (blog) => {
    setCurrentBlog(blog);
    setOpen(true);
  };

  const handleChange = (e) => {
    setCurrentBlog({ ...currentBlog, [e.target.name]: e.target.value });
  };

  const submitUpdate = () => {
    axios
      .put(`http://localhost:3001/posts/${currentBlog._id}`, currentBlog)
      .then(() => {
        setOpen(false);
        fetchBlogs();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={blog.image}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  {blog.category}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {blog.title}
                </Typography>
                <Box display="flex" gap={2} mt={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(blog._id)}
                  >
                    DELETE
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUpdate(blog)}
                  >
                    UPDATE
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Update Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6">Edit Blog</Typography>
          <TextField
            name="title"
            label="Title"
            value={currentBlog?.title || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="category"
            label="Category"
            value={currentBlog?.category || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="image"
            label="Image URL"
            value={currentBlog?.image || ''}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" onClick={submitUpdate}>
            Save Changes
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
