import React from 'react'

const Header = ({ course }) => {
    return (
        <h1>
            {course.name}
        </h1>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Total = ({ course }) => {
    return (
        <p>
            <b>
                total of exercises {course.parts.reduce((sum, part) => sum + part.exercises, 0)}
            </b>
        </p>
    )
}

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map(course =>
                <div key={course.id}>
                    <Header course={course} />
                    <Content course={course} />
                    <Total course={course} />
                </div>
            )}
        </div>
    )
}

export default Course