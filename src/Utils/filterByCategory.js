const filterByCategory = (data, category) => {

    let copied = [...data];

    if (category === "ALL") {
        return copied;
    } else {
        return copied.filter((eachVideo) => eachVideo.categoryName === category);
    }
};

export { filterByCategory }

