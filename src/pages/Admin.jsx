import { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
import { backendURIs } from '../config/routes';
import { imageSRCHandler } from '../config/imageResolver';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [adminNames, setAdminNames] = useState({});


    const fetchImage = () => {
        axios.get(backendURIs.gallery.getAdminPhotos)
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    }

    useEffect(() => {
        fetchImage();
        // Retrieve user data from localStorage
        const userDataString = localStorage.getItem('user');

        // Parse the JSON string to get the user object
        const userData = JSON.parse(userDataString);

        // Access the firstName and lastName properties
        const firstName = userData?.firstName || 'Ope';
        const lastName = userData?.lastName || 'Yemi';

        // Set the admin names state
        setAdminNames({ firstName, lastName });
    }, []);

    const toggleSelectImage = (id) => {
        if (selectedImages.includes(id)) {
            setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
        } else {
            setSelectedImages([...selectedImages, id]);
        }
    };

    const deleteSelectedImages = () => {
        const isConfirmed = window.confirm('Are you sure you want to delete all these images?');
        if (isConfirmed) {
            deleteFunction(selectedImages)
        }
    }

    const deleteImage = (imageId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this image?');
        if (isConfirmed) {
            deleteFunction([imageId])
        }
    };

    const deleteFunction = (data) => {
        setIsLoading(true);
        const formData = new FormData();

        data.forEach(imageId => {
            formData.append('image_ids[]', imageId);
        });

        formData.append('_method', 'delete');

        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        };

        // Send POST request to the backend for delete
        axios.post(backendURIs.gallery.deletePhotos, formData, config)
            .then(response => {
                alert(response.data?.message);
                fetchImage();
                // Reset selected images
                setSelectedImages([]);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                alert('Error action');
                console.error('Error uploading images:', error);
            });
    };

    const handleViewImage = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

    const handleChangeStatus = (imageHash) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('media_hash', imageHash);

        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        };

        // Send POST request to the backend  for change status of an image
        axios.post(backendURIs.gallery.changeImageStatus, formData, config)
            .then(response => {
                fetchImage();
                alert(response.data?.message);
                // Reset selected images
                setSelectedImages([]);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                alert('Error action');
                console.error('Error uploading images:', error);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('token_registered');
        navigate('/');
    }

    const handleUploadForm = () => {
        setIsUploadFormVisible(true);
    };

    const handleUpload = (event) => {
        setIsLoading(true);
        event.preventDefault();
        const formData = new FormData();
        const file = event.target.elements.image.files[0];

        if (file) {
            formData.append('image', file);
        }

        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        };

        // Send POST request to the backend  with uploaded image data
        axios.post(backendURIs.gallery.uploadImage, formData, config)
            .then(response => {
                fetchImage();
                alert(response.data?.message);
                // Hide upload form
                setIsUploadFormVisible(false);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                alert('Error action');
                console.error('Error uploading image:', error);
            });
    };


    return (
        <div className="container mx-auto mt-8 relative">
            {isLoading && (
                <div
                    className="absolute inset-0 bg-gray-300 opacity-50 z-10"
                    style={{ pointerEvents: 'none' }}
                />
            )}
            <button onClick={handleLogout} className='absolute top-2 right-2 bg-red-800 hover:bg-[#d3a755] rounded-md text-white px-3 py-2 font-semibold'>
                Logout
            </button>
            <h1 className="text-3xl font-bold mb-4">Admin Page</h1>
            <h1 className="text-xl font-semibold italic mb-4 capitalize">Hi, {adminNames?.firstName + ' ' + adminNames?.lastName}</h1>

            {/* Upload Images */}
            <div className="mb-8">
                <button
                    className="bg-[#d3a755] text-white py-2 px-4 rounded hover:bg-red-800"
                    onClick={handleUploadForm}
                >
                    Upload
                </button>

                <br />

                {/* Delete Selected Button */}
                <button
                    className={`${selectedImages.length === 0 ? 'bg-gray-600' : 'bg-red-500'} text-white py-2 px-4 rounded mt-4`}
                    onClick={deleteSelectedImages}
                    disabled={selectedImages.length === 0}
                >
                    Delete Selected
                </button>
            </div>

            {/* Upload Form */}
            {isUploadFormVisible && (
                <form onSubmit={handleUpload} className="mb-8">
                    <div className="flex flex-col md:flex-row items-center mb-4">
                        <label htmlFor="upload" className="md:mr-2 text-gray-700">Select Image:</label>
                        <input
                            id="upload"
                            name='image'
                            type="file"
                            accept='image/*'
                            className="border border-gray-400 py-2 px-4 rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#d3a755] text-white py-2 px-4 rounded hover:bg-red-800"
                    >
                        Upload Image
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsUploadFormVisible(false)}
                        className="hover:bg-[#d3a755] ml-5 text-white py-2 px-4 rounded bg-red-800"
                    >
                        Close
                    </button>
                </form>
            )}


            {/* Image Table */}
            <table className="w-full border-collapse border border-[#d3a755]">
                <thead>
                    <tr>
                        <th className="border border-[#d3a755] px-4 py-2">S/N</th>
                        <th className="border border-[#d3a755] px-4 py-2">
                            <input
                                type="checkbox"
                                checked={selectedImages.length === images.length}
                                onChange={() => {
                                    const newSelectedImages = selectedImages.length === images.length ? [] : images.map(image => image.media_hash);
                                    setSelectedImages(newSelectedImages);
                                }}
                            />
                        </th>
                        <th className="border border-[#d3a755] px-4 py-2">Image</th>
                        <th className="border border-[#d3a755] px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {images.map((image, index) => (
                        <tr key={image.media_hash}>
                            <td className="border border-[#d3a755] px-4 py-2">
                                <span className="mx-2 font-bold">
                                    {index + 1}
                                </span>
                            </td>
                            <td className="border border-[#d3a755] px-4 py-2">
                                <input
                                    type="checkbox"
                                    className='accent-red-800'
                                    checked={selectedImages.includes(image.media_hash)}
                                    onChange={() => toggleSelectImage(image.media_hash)}
                                />
                            </td>
                            <td className="border border-[#d3a755] px-4 py-2">
                                <img
                                    src={imageSRCHandler(image.image)}
                                    alt={`Image ${image.media_hash}`}
                                    className="cursor-pointer h-20 w-40"
                                    onClick={() => handleViewImage(image.image)}
                                />
                            </td>
                            <td className="border border-[#d3a755] px-4 py-2 space-y-2">
                                <button
                                    className={`${image.show_status ? 'bg-blue-500' : 'bg-green-500'} text-white py-1 px-2 rounded mr-2 hover:bg-[#d3a755]`}
                                    onClick={() => handleChangeStatus(image.media_hash)}
                                >
                                    {image.show_status ? 'Shown' : 'Hidden'}
                                </button>

                                <button
                                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-[#d3a755]"
                                    onClick={() => deleteImage(image.media_hash)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
