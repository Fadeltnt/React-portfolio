import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {ChipIcon} from "@heroicons/react/solid"; // Assurez-vous d'inclure le CSS
import { MdOutlineWork } from "react-icons/md";
export default function EducationAndExperience() {
    // Timeline items data
    const timelineItems = [
        {
            date: "Jan 2022 - Present",
            title: "Bachelor of Software Engineer",
            location: "Universite Laval, Quebec",
        },
        {
            date: "July 2024",
            title: "Representant de Marque ",
            location: "Bell, Quebec",
        },
        {
            date: "Jun 2024",
            title: "Microstage Initiation  A AWS",
            location: "Canadian Mobility and Aerospace Institute",
            certificate: "Attestation micro stage Aws.pdf",
        },
        {
            date: "July 2024",
            title: "Microstage Introdution a l'intelligence artificiel",
            location: "Canadian Mobility and Aerospace Institute",
            certificate: "Attestation IA.pdf",
        },

    ];

    // Icons corresponding to each timeline item
    const icons = [
        <img src="UL.png" alt=""/>,
        <img src="https://media.licdn.com/dms/image/C510BAQEHj3_SBhJ-Zw/company-logo_200_200/0/1537804728723/bizmetric_logo?e=2147483647&V=beta&t=EMU4PE70vxa2ny6-4PBGIM4J3jqDF-AQsYdjR7T-0JQ" alt="Bizmetric"/>,
        <img src="https://media.licdn.com/dms/image/C510BAQEHj3_SBhJ-Zw/company-logo_200_200/0/1537804728723/bizmetric_logo?e=2147483647&v=beta&t=EMU4PE70vxa2ny6-4PBGIM4J3jqDF-AQsYdjR7T-0JQ" alt="Bizmetric"/>,
        <img src="https://seeklogo.com/images/M/medium-2020-new-logo-4DD1CA1BFF-seeklogo.com.png" alt="Medium"/>,
        <img src="https://media.licdn.com/dms/image/C510BAQFJe2R-Ua3RLw/company-logo_200_200/0/1570778089350?e=2147483647&v=beta&t=Veq5LfpVHF1P7Aa-pp7E7vA-MwHeILIZinlY_ug2aDE" alt="CCR Technologies"/>,
    ];

    // Background color for timeline elements
    const color = ["#00ffe2"];

    return (
        <section>
            <div className="text-center mb-20">
                <MdOutlineWork className="w-20 h-20 inline-block mb-4"/>
                <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
                   Experience Et Formations
                </h1>

            </div>
            <div className="mx-auto">
                <VerticalTimeline>
                    {timelineItems.map((item, index) => (
                        <VerticalTimelineElement
                            key={index}
                            date={<div className="mx-4">{item.date}</div>}
                            contentStyle={{
                                background: index % 2 === 0 ? color[0] : 'white',
                                color: 'grey',
                            }}
                            contentArrowStyle={{borderRight: '7px solid #3498db'}}
                            iconStyle={{
                                background: 'transparent',
                                color: '#3498db',
                                border: '2px solid #3498db',
                                padding: '16px',
                                marginRight: '4px',
                            }}
                            icon={icons[index]}
                        >
                            <h3 className="vertical-timeline-element-title">{item.title}</h3>
                            <h4 className="vertical-timeline-element-subtitle">{item.location}</h4>
                            {item.certificate &&
                                <button
                                    onClick={() => window.open(item.certificate)}
                                    style={{
                                        backgroundColor: '#3498db',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '10px 20px',
                                        textDecoration: 'none',
                                        marginTop: '10px'
                                    }}
                                >
                                    Télécharger l'attestation
                                </button>
                            }
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </div>
        </section>
    );
}