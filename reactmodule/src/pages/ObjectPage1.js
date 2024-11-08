// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { getItemById } from "api/index"; // Adjust path as necessary

// function ObjectPage() {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true); // Add loading state
//     const [error, setError] = useState(null); // Add error state
//     const { s_id } = useParams(); // Assuming you are using a route parameter for the ID

//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             setLoading(true); // Set loading to true before fetch
//     //             const result = await getItemById(s_id);
//     //             setData(result || null);
//     //         } catch (error) {
//     //             setError(error); // Set error if there's an issue
//     //         } finally {
//     //             setLoading(false); // Set loading to false after fetch
//     //         }
//     //     };

//     //     fetchData();
//     // }, [s_id]);

//     // if (loading) return <p>Loading...</p>; // Display loading message
//     // if (error) return <p>Error loading data: {error.message}</p>; // Display error message

//     return (
//         <div>
//             {/* Table displaying data */}
//             <div style={{ marginTop: "20px" }}>
//                 <h2>Entity Details</h2>
//                 <table className="full-width-table">
//                     <tbody>
//                         <tr>
//                             <td className="full-width-cell">
//                                 <label htmlFor="id">ID: </label>
//                                 <input
//                                     type="text"
//                                     id="s_id"
//                                     name="s_id"
//                                     value={data ? data.s_id : ""}
//                                     readOnly
//                                 />
//                             </td>
//                             <td className="full-width-cell">
//                                 <label htmlFor="s_name">Name: </label>
//                                 <input
//                                     type="text"
//                                     id="s_name"
//                                     name="s_name"
//                                     value={data ? data.s_name : ""}
//                                     readOnly
//                                 />
//                             </td>
//                             <td className="full-width-cell">
//                                 <label htmlFor="s_marks">Marks: </label>
//                                 <input
//                                     type="text"
//                                     id="s_marks"
//                                     name="s_marks"
//                                     value={data ? data.s_marks : ""}
//                                     readOnly
//                                 />
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>

//             {/* Link to Master Page */}
//             <div style={{ marginTop: "20px" }}>
//                 <Link to="/reactmodule/index.html">Go to Master Page</Link>
//             </div>
//         </div>
//     );
// }

// export default ObjectPage;
import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { ObjectPage, ObjectPageSection, ObjectPageHeader, Text } from "@ui5/webcomponents-react";

function ObjectPage1() {
    const { state } = useLocation(); // Use useLocation to access the state
    const data = state ? state.row : null; // Extract row data if available
    const [loading, setLoading] = useState(!data); // Determine loading state based on data presence
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!data) {
            // If no data is passed, you might want to fetch it here
            setLoading(true);
            // Implement fetching logic here if needed
            setLoading(false);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>; // Display loading message
    if (error) return <p>Error loading data: {error.message}</p>; // Display error message

    return (
        <div>
              <ObjectPage
            header={<ObjectPageHeader titleText="Details" />}
            selectedSectionId="form" // Make sure the default selected section is displayed
            showHideHeaderButton
            title="Object Details" // Set the title for the ObjectPage
        >
            {/* Section for form details */}
            <ObjectPageSection id="form" titleText="Form">
                {/* You can add your form elements here */}
                <Text>Complain Number: {data ? data.complainno : 'N/A'}</Text>
                <Text>CPONo: {data ? data.cpono : 'N/A'}</Text>
                <Text>CVEencode: {data ? data.cvencode : 'N/A'}</Text>
            </ObjectPageSection>

            {/* Section for attachments */}
            <ObjectPageSection id="attachments" titleText="Attachments">
                {/* You can add your attachment-related elements here */}
                <Text>No attachments available.</Text>
            </ObjectPageSection>
        </ObjectPage>

        </div>

        // <div className="main">
        //     <table className="form-table">
        //         <tbody>
        //             <tr>
        //                 <td>
        //                     <label htmlFor="FirstName">complainno</label><br />
        //                     <input type="text" id="FirstName" value={data ? data.complainno : ''} readOnly />
        //                 </td>
        //                 <td>
        //                     <label htmlFor="LastName">cpono</label><br />
        //                     <input type="text" id="LastName" value={data ? data.cpono : ''} readOnly />
        //                 </td>
        //                 <td>
        //                     <label htmlFor="email">cvencode</label><br />
        //                     <input type="text" id="email" value={data ? data.cvencode : ''} readOnly />
        //                 </td>
        //             </tr>
        //             {/* <tr>
        //                 <td>
        //                     <label htmlFor="Phone">Phone</label><br />
        //                     <input type="text" id="Phone" value={data ? data.phone : ''} readOnly />
        //                 </td>
        //                 <td>
        //                     <label htmlFor="gen">Gen</label><br />
        //                     <input type="text" id="gen" value={data ? data.gen : ''} readOnly />
        //                 </td>
        //             </tr> */}
        //         </tbody>
        //     </table>
        // </div>

    );
};
export default ObjectPage1;
