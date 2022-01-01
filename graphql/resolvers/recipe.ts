const archivedResolver = ({ archived }: Recipe) => {
    return Boolean(archived);
}

export { archivedResolver }