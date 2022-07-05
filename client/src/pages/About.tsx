import styled from "styled-components";

import githubIcon from "../assets/otherIcons/github-freepik.png";

import aboutCopy from "../faqCopy"

const AboutContainer = styled.div`
    width: 100%;
    padding: 10px 40px 20px;
    color: #5C33F6;
`

const Question = styled.h2`
    margin-inline: 0;
    font-size: 1.8em;
`

const Answer = styled.p`
    font-size: 1.3em;
    line-height: 1.7em;
`

const GitHub = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
`

const GithubIcon = styled.img`
    height: 30px;
    margin-left: 1em;
    filter: invert(19%) sepia(64%) saturate(4790%) hue-rotate(251deg) brightness(96%) contrast(102%);
`

interface CopyItem {
    q: string,
    a: string
}

const About = () => {
    return (
        <AboutContainer>
            {aboutCopy.map(({q, a}: CopyItem) => (
                <div key={q}>
                    <Question>{q}</Question>
                    <Answer>{a}</Answer>
                </div>
            ))}
            <GitHub>Daoud Merchant, 2022
                <a href="https://github.com/daoudmerchant/jazzify/" target="_blank">
                    <GithubIcon src={githubIcon} alt="github logo"/>
                </a>
            </GitHub>
        </AboutContainer>
    )
}

export default About;