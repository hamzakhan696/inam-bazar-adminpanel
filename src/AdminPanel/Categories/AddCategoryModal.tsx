import { useMediaQuery } from "@mantine/hooks";
import { Modal, Box, Grid, TextInput, Flex, Group, Button, Textarea, SimpleGrid, FileInput, Image } from "@mantine/core";
import { useState, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";

interface AddCategoryProps {
  opened: boolean;
  onClose: () => void;
}

interface FileWithPreview {
  url: string;
  name: string;
}

export const AddCategoryModal = ({ opened, onClose }: AddCategoryProps) => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 430px)');
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleFileChange = (selectedFiles: File[] | null) => {
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles)
        .slice(0, 5 - files.length)
        .map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
        }));
      setFiles([...files, ...newFiles].slice(0, 5));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [files]);

  const previews = files.map((file, index) => (
    <Box key={index} style={{ position: 'relative', width: '50px', height: '50px' }}>
      <Image
        src={file.url}
        alt={file.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
    </Box>
  ));

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Add New Category"
      size="xxl"
      centered
      radius={"xl"}
      styles={{
        title: {
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#4C4E6A',padding: '20px'
        },
        body: {
          padding: isExtraSmallScreen ? '20px' : '20px 80px',
        },
      }}
    >
      <Box>
        <Grid gutter="xl">
          {/* Left Column */}
          <Grid.Col span={isSmallScreen ? 12 : 6}>
            <TextInput
              label="Title"
              placeholder="Enter title"
              mb="sm"
              required
              style={{ width: '100%' }}
              styles={{
                input: {
                  padding: '25px 20px',
                  borderRadius: '10px',
                  borderColor: '#53CCFF',
                },
                label: {
                  fontSize: '18px',
                  marginBottom: '5px',
                  color: '#4C4E6A',
                },
              }}
            />
            <Textarea
              label="Description"
              placeholder="Enter description"
              minRows={4}
              mb="sm"
              required
              style={{ width: '100%' }}
              styles={{
                input: {
                  padding: '15px 20px',
                  borderRadius: '10px',
                  borderColor: '#53CCFF',
                  height: '200px',
                },
                label: {
                  fontSize: '18px',
                  marginBottom: '5px',
                  color: '#4C4E6A',
                },
              }}
            />
            <Flex gap={20} align="stretch">
              <TextInput
                label="Products"
                leftSection={<IconSearch size={20} color="#53CCFF" />}
                placeholder="Search for Products"
                style={{ width: '300px' }}
                styles={{
                  input: {
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    border: '1px solid #53CCFF',
                    padding: '25px 40px',
                  },
                  label: {
                    fontSize: '18px',
                    marginBottom: '5px',
                    color: '#4C4E6A',
                  },
                }}
              />
              <Button
                style={{
                  width: '100px',
                  padding: '10px',
                  backgroundColor: 'transparent',
                  border: '1px solid #53CCFF',
                  color: '#53CCFF',
                  height: '50px',
                  marginTop: '33px'
                }}
              >
                Browse
              </Button>
            </Flex>
          </Grid.Col>

          {/* Right Column */}
          <Grid.Col span={isSmallScreen ? 12 : 6}>
            <Box>
              <FileInput
                label="Media"
                placeholder="Upload product images"
                accept="image/*"
                multiple
                required
                mb="sm"
                style={{ width: '100%' }}
                styles={{
                  input: {
                    padding: '15px 20px',
                    borderRadius: '10px',
                    borderColor: '#53CCFF',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F8F9FA',
                    cursor: 'pointer',
                    textAlign: 'center',
                  },
                  label: {
                    fontSize: '18px',
                    marginBottom: '5px',
                    color: '#4C4E6A',
                  },
                }}
                onChange={handleFileChange}
                value={files.map((file) => new File([], file.name))}
              />
              {files.length > 0 && (
                <SimpleGrid cols={isSmallScreen ? 3 : 6} spacing="xs" mt="sm">
                  {previews}
                </SimpleGrid>
              )}
            </Box>
          </Grid.Col>
        </Grid>
        <Group justify="flex-end" mt="md">
          <Button c="white" style={{ backgroundColor: '#53CCFF' }}>
            Save
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};