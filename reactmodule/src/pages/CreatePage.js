import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "api/index.js"; // Adjust the path accordingly
import { Modal } from "@material-ui/core";
const CreatePage = () => {
    const [complainno, setcomplainno] = useState('');
    const [cpono, setcpono] = useState('');
    const [cvencode, setcvencode] = useState('');
    const [comment, setComment] = useState('');
    const [attachments, setAttachments] = useState([]); // State for file attachments
    const [isDragging, setIsDragging] = useState(false); // State to handle drag state
    const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal open/close
    const [commentHistory, setCommentHistory] = useState([]); // State for comment history
    
    const navigate = useNavigate();
    const exampleComments = [
        {
            dateTime: "2024-09-22 10:23",
            userName: "John Doe",
            text: "First comment on the complaint",
            userPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSosr3BodWxqx-dV3sVDt-GwoR2Uv4RUazzzA&s"
        },
        {
            dateTime: "2024-09-23 15:45",
            userName: "Jane Smith",
            text: "Follow-up comment",
            userPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSosr3BodWxqx-dV3sVDt-GwoR2Uv4RUazzzA&s"
        },
    ];

    // Handle file uploads from file input or drop
    const handleFiles = (files) => {
        const newFiles = Array.from(files).map(file => ({
            file,
            url: URL.createObjectURL(file) // Create object URL for the uploaded file
        }));
        setAttachments(prevAttachments => [...prevAttachments, ...newFiles]);
    };

    // Handle drag over event
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true); // Highlight the drop area
    };

    // Handle drag leave event
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false); // Remove highlight from drop area
    };

    // Handle drop event
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    };

    // Handle file input change
    const handleFileUpload = (e) => {
        const files = e.target.files;
        if (files.length) {
            handleFiles(files);
        }
    };

    // Remove file from the attachment list
    const handleRemoveAttachment = (index) => {
        const fileToRemove = attachments[index];
        URL.revokeObjectURL(fileToRemove.url); // Revoke the object URL
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("complainno", complainno);
        formData.append("cpono", cpono);
        formData.append("cvencode", cvencode);
        formData.append("comment", comment);

        attachments.forEach((attachment, i) => {
            formData.append(`attachment_${i}`, attachment.file); // Append each attachment to form data
        });

        try {
            await createItem(formData); // Send the form data with attachments
            console.log('Item created successfully');
            navigate('/success');
        } catch (error) {
            console.error('Error while creating item:', error);
        }
    };

    const handleCancel = () => {
        console.log("Cancel button clicked");
        window.history.back();
    };
    const handleCommentHistory = () => {
        setCommentHistory(exampleComments); // Load actual comments from API or use hardcoded data
        setIsModalOpen(true);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };



    return (
        <div className="main">
            <table className="form-table">
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="ids">complainno</label><br />
                            <input
                                type="text"
                                id="complainno"
                                value={complainno}
                                onChange={(e) => setcomplainno(e.target.value)}
                            />
                        </td>
                        <td>
                            <label htmlFor="name">cpono</label><br />
                            <input
                                type="text"
                                id="cpono"
                                value={cpono}
                                onChange={(e) => setcpono(e.target.value)}
                            />
                        </td>
                        <td>
                            <label htmlFor="marks">cvencode</label><br />
                            <input
                                type="text"
                                id="cvencode"
                                value={cvencode}
                                onChange={(e) => setcvencode(e.target.value)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Comment Section */}
            <div className="comment-section">
                <h3>Comment</h3>
                <button className="comment-history-btn" onClick={handleCommentHistory}>
                    View Comment History
                </button>
                <div className="comment-header">
                    <textarea
                        className="comment-textarea"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter your comment here..."
                    ></textarea>
                </div>
            </div>

            {/* Modal for comment history */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <div style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    width: '60vw',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    borderRadius: '8px',
                }}>
                    <h3>Comments Timeline</h3>
                    <div className="timeline">
                        {commentHistory.length > 0 ? (
                            commentHistory.map((item, index) => (
                                <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={item.userPicture} alt={item.userName} style={{ width: '40px', borderRadius: '50%', marginRight: '10px' }} />
                                        <div>
                                            <strong>{item.userName}</strong><br />
                                            <small>{item.dateTime}</small>
                                        </div>
                                    </div>
                                    <p style={{ marginTop: '10px' }}>{item.text}</p>
                                </div>
                            ))
                        ) : (
                            <p>No comments found.</p>
                        )}
                    </div>
                    <button onClick={handleCloseModal} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                        Close
                    </button>
                </div>
            </Modal>

            {/* Attachment Section */}
            <div className="attachment-section">
                <div className="attachment-header">
                    <label htmlFor="fileUpload">Attachments</label>
                    <input
                        type="file"
                        id="fileUpload"
                        multiple
                        onChange={handleFileUpload}
                        style={{ display: 'none' }} // Hide file input
                    />
                    <button
                        className="choose-file-btn"
                        onClick={() => document.getElementById('fileUpload').click()}
                    >
                        Choose File
                    </button>
                </div>

                {/* Div for drag-and-drop with background image */}
                <div
                    className={`drop-zone ${isDragging ? "dragging" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{ backgroundImage: "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.stickergenius.com%2Funderstanding-design-file-types%2F&psig=AOvVaw0ZnOGQDGAW6Q4-ZHqwGTlV&ust=1726896256605000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDkyZbk0IgDFQAAAAAdAAAAABAJ')", height: '60px', width: '100%' }}
                >
                    {attachments.length === 0 ? (
                        <p style={{ margin: 0 }}>Drag and drop files here...</p>
                    ) : (
                        attachments.map((attachment, index) => (
                            <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                                <a
                                    href={attachment.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {attachment.file.name}
                                </a>
                                <button onClick={() => handleRemoveAttachment(index)}>Remove</button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="button-div">
                <button className="sub-btn" onClick={handleSubmit}>Submit</button>
                <button className="can-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default CreatePage;
