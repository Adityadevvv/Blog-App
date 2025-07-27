import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Modal,
  TextField,
  CardMedia,
} from '@mui/material';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  const fetchBlogs = () => {
    axios
      .get('http://localhost:3001/posts')
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`)
      .then(() => fetchBlogs())
      .catch((err) => console.error(err));
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
      .catch((err) => console.error(err));
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#121212', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} key={blog._id}>
            <Card sx={{ display: 'flex', backgroundColor: '#1e1e1e', color: 'white' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="purple" fontWeight="bold" gutterBottom>
                  {blog.category}
                </Typography>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {blog.title}
                </Typography>
                <Box display="flex" gap={2} mt={2}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#9C27B0', color: 'white' }}
                    onClick={() => handleDelete(blog._id)}
                  >
                    DELETE
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#9C27B0', color: 'white' }}
                    onClick={() => handleUpdate(blog)}
                  >
                    UPDATE
                  </Button>
                </Box>
              </CardContent>
              <CardMedia
                component="img"
                image={blog.image}
                alt="blog image"
                sx={{ width: 200, objectFit: 'cover', borderLeft: '1px solid #333' }}
              />
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
          <Button
            variant="contained"
            sx={{ backgroundColor: '#9C27B0', color: 'white' }}
            onClick={submitUpdate}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
