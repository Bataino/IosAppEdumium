import http from "./http"
// const defFormdata = { "student_id" : localStorage.getItem("student_id")}

export const login = async (formdata) => {
    const response = http.post('auth/login', formdata)
        .then((res) => {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("student_id", res.data.record.student_id)
            localStorage.setItem("user-ID", res.data.record.id)
            localStorage.setItem("user", JSON.stringify(res.data.record))
            return res.data
        })
    return response;
}

export const dashboard = async (formdata) => {
    const response = http.post('webservice/dashboard', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const fees = async (formdata) => {
    const response = http.post('webservice/fees', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getListOnlineCourse = async (formdata) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = http.post('webservice/courselist', {
        student_id: localStorage.getItem("student_id"),
        class_id: user.class_id,
        section_id: user.section_id,
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getCourseDetail = async (formdata) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = http.post('webservice/coursedetail', {
        student_id: localStorage.getItem("student_id"),
        class_id: user.class_id,
        section_id: user.section_id,
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getBbbClasses = async (formdata) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = http.post('webservice/bbbclasses', {
        student_id: localStorage.getItem("student_id"),
        class_id: user.class_id,
        section_id: user.section_id,
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getTimetable = async (formdata) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = http.post('webservice/class_schedule', {
        student_id: localStorage.getItem("student_id"),
        class_id: user.class_id,
        section_id: user.section_id,
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getLessonPlan = async (formdata) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = http.post('webservice/getLessonPlan', {
        student_id: localStorage.getItem("student_id"),
        class_id: user.class_id,
        section_id: user.section_id,
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getSyllabusStatus = async (formdata) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = http.post('webservice/getsyllabussubjects', {
        student_id: localStorage.getItem("student_id"),
        class_id: user.class_id,
        section_id: user.section_id,
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getSubjectSyllabus = async (formdata) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = http.post('webservice/getSubjectsLessons', {
        student_id: localStorage.getItem("student_id"),
        class_id: user.class_id,
        section_id: user.section_id,
        ...formdata
    })
        .then((res) => {
            return res.data
        })
    return response;
}

export const getHomeWork = async (formdata) => {
    // const user = JSON.parse(localStorage.getItem("user"))
    const response = http.post('webservice/getHomeWork', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
        .then((res) => {
            return res.data
        })
    return response;
}

export const uploadHomeWork = async (formdata) => {
    // const user = JSON.parse(localStorage.getItem("user"))
    formdata.append('student_id', localStorage.getItem("student_id"),)
    const response = http.post('webservice/addaa', formdata )
        .then((res) => {
            return res.data
        })
    return response;
}

export const getOnlineExam = async (formdata) => {
    const response = http.post('webservice/getOnlineExam', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getOnlineExamResult = async (formdata) => {
    const response = http.post('webservice/getOnlineExamResult', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getDocs = async (formdata) => {
    const response = http.post('webservice/getDocument', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
    .then((res) => {
        return res.data
    })
    return response;
}

export const addDocs = async (formdata) => {
    formdata.append('student_id', localStorage.getItem("student_id"))
    const response = http.post('webservice/uploadDocument', formdata)
    .then((res) => {
        return res.data
    })
    return response;
}

export const getApplyLeave = async (formdata) => {
    const response = http.post('webservice/getApplyLeave', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const addLeave = async (formdata) => {
    // const user = JSON.parse(localStorage.getItem("user"))
    formdata.append('student_id', localStorage.getItem("student_id"),)
    const response = http.post('webservice/addLeave', formdata )
        .then((res) => {
            return res.data
        })
    return response;
}

export const updateLeave = async (formdata) => {
    // const user = JSON.parse(localStorage.getItem("user"))
    formdata.append('student_id', localStorage.getItem("student_id"),)
    const response = http.post('webservice/updateLeave', formdata )
        .then((res) => {
            return res.data
        })
    return response;
}

export const deleteLeave = async (formdata) => {
    // const user = JSON.parse(localStorage.getItem("user"))
    const response = http.post('webservice/deleteLeave', {
        ...formdata
    })
    .then((res) => {
        return res.data
    })
    return response;
}

export const getAttendance = async (formdata) => {
    const response = http.post('webservice/getAttendenceRecords', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getExamList = async (formdata) => {
    const response = http.post('webservice/getExamList', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getExamResult = async (formdata) => {
    const response = http.post('webservice/getExamResult', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
    .then((res) => {
        return res.data
    })
    return response;
}

export const getNotifications = async (formdata) => {
    const response = http.post('webservice/getNotifications', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
    .then((res) => {
        return res.data
    })
    return response;
}

export const getDownloadsLinks = async (formdata) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = http.post('webservice/getDownloadsLinks', {
        student_id: localStorage.getItem("student_id"),
        class_id: user.class_id,
        section_id: user.section_id,
        ...formdata
    })
        .then((res) => {
            return res.data
        })
    return response;
}

export const getTimeline = async (formdata) => {
    const response = http.post('webservice/getTimeline', {
        studentId: localStorage.getItem("student_id"),
        ...formdata
    })
    .then((res) => {
        return res.data
    })
    return response;
}

export const getExamSchedule = async (formdata) => {
    const response = http.post('webservice/getExamSchedule', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
    .then((res) => {
        return res.data
    })
    return response;
}

export const getTeachersList = async (formdata) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = http.post('webservice/getTeachersList', {
        student_id: localStorage.getItem("student_id"),
        class_id: user.class_id,
        section_id: user.section_id,
        ...formdata
    })
        .then((res) => {
            return res.data
        })
    return response;
}

export const getTeacherSubject = async (formdata) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const response = http.post('webservice/getTeacherSubject', {
        student_id: localStorage.getItem("student_id"),
        class_id: user.class_id,
        section_id: user.section_id,
        ...formdata
    })
        .then((res) => {
            return res.data
        })
    return response;
}

export const getLibraryBookIssued = async (formdata) => {
    const response = http.post('webservice/getLibraryBookIssued', {
        studentId: localStorage.getItem("student_id"),
        ...formdata
    })
    .then((res) => {
        return res.data
    })
    return response;
}

export const getLibraryBooks = async (formdata) => {
    const response = http.get('webservice/getLibraryBooks', {
        ...formdata
    })
    .then((res) => {
        return res.data
    })
    return response;
}

export const getTransportRoute = async (formdata) => {
    const response = http.post('webservice/getTransportroute', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
    .then((res) => {
        return res.data
    })
    return response;
}

export const getHostelList = async (formdata) => {
    const response = http.get('webservice/getHostelList', {
        ...formdata
    })
    .then((res) => {
        return res.data
    })
    return response;
}

export const getHostelDetails = async (formdata) => {
    const response = http.post('webservice/getHostelDetails', {
        ...formdata
    })
    .then((res) => {
        return res.data
    })
    return response;
}

export const getProfile = async (formdata) => {
    const response = http.post('webservice/getStudentProfile', {
        student_id: localStorage.getItem("student_id"),
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getTask = async (formdata) => {
    const response = http.post('webservice/getTask', {
        student_id: localStorage.getItem("student_id"),
        user_id: localStorage.getItem("user-ID"),
        ...formdata
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const addTask = async (formdata) => {
    const response = http.post('webservice/addTask', {
        student_id: localStorage.getItem("student_id"),
        user_id: localStorage.getItem("user-ID"),
        ...formdata
    })
        .then((res) => {
            return res.data
        })
    return response;
}

export const updateTask = async (formdata) => {
    const response = http.post('webservice/updateTask', {
        student_id: localStorage.getItem("student_id"),
        user_id: localStorage.getItem("user-ID"),
        ...formdata
    })
        .then((res) => {
            return res.data
        })
    return response;
}



export const logout = async () => {
    const response = http.post('webservice/logout', {
        deviceToken: localStorage.getItem("deviceToken") ?? "Some Randam"
    })
        .then((res) => {
           
            return res.data
        })
    return response;
}

export const getSchoolDetails = async (formdata) => {
    const response = http.post('webservice/getSchoolDetails', {
        ...formdata
    })
    .then((res) => {
        return res.data
    })
    return response;
}